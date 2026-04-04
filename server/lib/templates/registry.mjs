import { TEMPLATE_DEFINITIONS } from './definitions/index.mjs';
import { TEMPLATE_CONTEXT_VERSION } from './constants.mjs';

export const DEFAULT_TEMPLATE_ID = 'template-1';

function validateTemplateDefinition(template) {
  if (!template?.id || !template?.label || !template?.description) {
    throw new Error('Template definitions must include id, label, and description.');
  }

  if (!template?.promptSuggestion || !template?.designFreedom || !template?.designGuidance) {
    throw new Error(`Template "${template.id}" is missing authoring guidance.`);
  }

  if (!template?.requiredAttribution?.linkedIn?.label || !template?.requiredAttribution?.linkedIn?.url) {
    throw new Error(`Template "${template.id}" must declare a LinkedIn attribution requirement.`);
  }

  if (!template?.requiredAttribution?.gitme?.label || !template?.requiredAttribution?.gitme?.url) {
    throw new Error(`Template "${template.id}" must declare a GitMe attribution requirement.`);
  }

  if (
    !template?.supportedContextRange ||
    typeof template.supportedContextRange.min !== 'number' ||
    typeof template.supportedContextRange.max !== 'number'
  ) {
    throw new Error(`Template "${template.id}" must declare a supported context range.`);
  }

  if (
    !template?.updatePolicy?.additiveData ||
    !template?.updatePolicy?.templateBodyUpgrades ||
    !template?.updatePolicy?.breakingChanges ||
    !template?.updatePolicy?.notification
  ) {
    throw new Error(`Template "${template.id}" must declare an update policy.`);
  }

  if (template.contextVersion !== TEMPLATE_CONTEXT_VERSION) {
    throw new Error(
      `Template "${template.id}" targets context v${template.contextVersion}, but the registry is on v${TEMPLATE_CONTEXT_VERSION}.`
    );
  }

  return template;
}

const TEMPLATE_REGISTRY = TEMPLATE_DEFINITIONS.map(validateTemplateDefinition);

export function listTemplateDefinitions() {
  return TEMPLATE_REGISTRY.map((template) => structuredClone(template));
}

export function getDefaultTemplateDefinition() {
  return TEMPLATE_REGISTRY.find((template) => template.default) || TEMPLATE_REGISTRY[0];
}

export function getTemplateDefinition(templateId) {
  if (!templateId) {
    return getDefaultTemplateDefinition();
  }

  return TEMPLATE_REGISTRY.find((template) => template.id === templateId) || getDefaultTemplateDefinition();
}

export function resolveTemplateCompatibility(templateId, requestedContextVersion = TEMPLATE_CONTEXT_VERSION) {
  const template = getTemplateDefinition(templateId);
  const min = template.supportedContextRange?.min ?? template.contextVersion;
  const max = template.supportedContextRange?.max ?? template.contextVersion;

  if (requestedContextVersion >= min && requestedContextVersion <= max) {
    return {
      status: 'supported',
      requestedContextVersion,
      supportedContextRange: { min, max },
      message: 'The template body is inside its declared support range.',
    };
  }

  return {
    status: 'legacy-compatible',
    requestedContextVersion,
    supportedContextRange: { min, max },
    message:
      'The template body may not adopt the newest shared fields yet, but the platform shell can safely carry universal additions until the maintainer opts into a template update.',
  };
}

export function buildStoredTemplateSummary(templateId) {
  const template = getTemplateDefinition(templateId);

  return {
    id: template.id,
    label: template.label,
    version: template.version,
    contextVersion: template.contextVersion,
    description: template.description,
    status: template.status,
    supportedContextRange: template.supportedContextRange,
    updatePolicy: template.updatePolicy,
  };
}
