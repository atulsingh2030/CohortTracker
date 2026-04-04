import cron from 'node-cron';

const schedulerState = {
  started: false,
  cron: null,
  timezone: 'UTC',
  nextRunAt: null,
  lastTriggeredAt: null,
};

let task = null;

export function startContributionScheduler({ cronExpression, timezone = 'UTC', onTick }) {
  if (task) {
    return schedulerState;
  }

  task = cron.schedule(cronExpression, async () => {
    schedulerState.lastTriggeredAt = new Date().toISOString();

    try {
      await onTick();
    } finally {
      schedulerState.nextRunAt = computeNextRunAt(cronExpression);
    }
  }, {
    timezone,
    scheduled: true,
  });

  schedulerState.started = true;
  schedulerState.cron = cronExpression;
  schedulerState.timezone = timezone;
  schedulerState.nextRunAt = computeNextRunAt(cronExpression);

  return schedulerState;
}

export function getContributionSchedulerState() {
  return {
    ...schedulerState,
  };
}

function computeNextRunAt(cronExpression, now = new Date()) {
  const match = cronExpression.match(/^(\d{1,2}) (\d{1,2}) \* \* \*$/);

  if (!match) {
    return null;
  }

  const minute = Number(match[1]);
  const hour = Number(match[2]);
  const next = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    hour,
    minute,
    0,
    0
  ));

  if (next.getTime() <= now.getTime()) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  return next.toISOString();
}
