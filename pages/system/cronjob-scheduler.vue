<script lang="ts" setup>

const cronExpression = ref("* * * * *");
const minute = ref("*");
const hour = ref("*");
const dayOfMonth = ref("*");
const month = ref("*");
const dayOfWeek = ref("*");
const customExpression = ref(false);
const command = ref("");

const parseCronExpression = (expression: string) => {
  const parts = expression.trim().split(/\s+/);
  if (parts.length === 5) {
    minute.value = parts[0];
    hour.value = parts[1];
    dayOfMonth.value = parts[2];
    month.value = parts[3];
    dayOfWeek.value = parts[4];
  }
};

watch([minute, hour, dayOfMonth, month, dayOfWeek], () => {
  if (!customExpression.value) {
    cronExpression.value = `${minute.value} ${hour.value} ${dayOfMonth.value} ${month.value} ${dayOfWeek.value} ${command.value}`;
  }
});

watch(cronExpression, () => {
  if (customExpression.value) {
    parseCronExpression(cronExpression.value);
  }
});

watch(command, () => {
  cronExpression.value = `${minute.value} ${hour.value} ${dayOfMonth.value} ${month.value} ${dayOfWeek.value} ${command.value}`;
})
const explanation = computed(() => {
  try {
    let text = "This cron will run ";

    if (minute.value === "*") {
      text += "every minute";
    } else if (minute.value.includes("/")) {
      const [_, step] = minute.value.split("/");
      text += `every ${step} minutes`;
    } else if (minute.value.includes("-")) {
      const [start, end] = minute.value.split("-");
      text += `every minute from ${start} through ${end}`;
    } else {
      text += `at minute ${minute.value}`;
    }

    if (hour.value === "*") {
      text += " of every hour";
    } else if (hour.value.includes("/")) {
      const [_, step] = hour.value.split("/");
      text += `, every ${step} hours`;
    } else if (hour.value.includes("-")) {
      const [start, end] = hour.value.split("-");
      text += `, every hour from ${start} through ${end}`;
    } else {
      text += ` in hour ${hour.value}`;
    }

    if (dayOfMonth.value !== "*") {
      if (dayOfMonth.value.includes("/")) {
        const [_, step] = dayOfMonth.value.split("/");
        text += `, every ${step} days`;
      } else if (dayOfMonth.value.includes("-")) {
        const [start, end] = dayOfMonth.value.split("-");
        text += `, on days ${start} through ${end} of the month`;
      } else {
        text += `, on day ${dayOfMonth.value} of the month`;
      }
    }

    if (month.value !== "*") {
      const monthNames = ["", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

      if (month.value.includes("/")) {
        const [_, step] = month.value.split("/");
        text += `, every ${step} months`;
      } else if (month.value.includes("-")) {
        const [start, end] = month.value.split("-");
        text += `, in months ${monthNames[parseInt(start)]} through ${monthNames[parseInt(end)]}`;
      } else {
        text += `, in ${monthNames[parseInt(month.value)]}`;
      }
    }

    if (dayOfWeek.value !== "*") {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      if (dayOfWeek.value.includes("/")) {
        const [_, step] = dayOfWeek.value.split("/");
        text += `, every ${step} days of the week`;
      } else if (dayOfWeek.value.includes("-")) {
        const [start, end] = dayOfWeek.value.split("-");
        text += `, on ${dayNames[parseInt(start)]} through ${dayNames[parseInt(end)]}`;
      } else {
        text += `, on ${dayNames[parseInt(dayOfWeek.value)]}`;
      }
    }

    return text;
  } catch (error) {
    return "Invalid cron expression";
  }
});

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Error while copying to clipboard:", error);
  }
};
</script>

<template>
  <div class="app">
    <Navigation />
    <Navbar />
    <h1>Crontab Scheduler</h1>

    <div class="input-container">
      <div class="cron-editor">
        <div class="cron-toggle">
        </div>

        <div v-if="customExpression">
          <input type="text" v-model="cronExpression" placeholder="* * * * *" />
        </div>
        <div v-else class="cron-fields">
          <div class="cron-field">
            <label>Minute (0-59)</label>
            <input type="text" v-model="minute" placeholder="*" />
          </div>
          <div class="cron-field">
            <label>Hour (0-23)</label>
            <input type="text" v-model="hour" placeholder="*" />
          </div>
          <div class="cron-field">
            <label>Day of Month (1-31)</label>
            <input type="text" v-model="dayOfMonth" placeholder="*" />
          </div>
          <div class="cron-field">
            <label>Month (1-12)</label>
            <input type="text" v-model="month" placeholder="*" />
          </div>
          <div class="cron-field">
            <label>Day of Week (0-6)</label>
            <input type="text" v-model="dayOfWeek" placeholder="*" />
          </div>
        </div>
      </div>

      <label>Command</label>
      <input
          type="text"
          v-model="command"
          placeholder="Enter Command"
          class="command-input"
          @keyup.enter=""
      />

      <div class="result-container">
        <h2>Expression:</h2>
        <div class="result">
          <span>{{ cronExpression }}</span>
        </div>
        <span class="explanation">{{ explanation }}</span>
        <div class="button-container">
          <a class="button-container-button" @click="copyToClipboard(cronExpression)">Copy</a>
        </div>
      </div>


      <div class="cron-reference">
        <h2>Quick Reference:</h2>
        <div class="result">
          <div class="reference-item">
            <p><strong>*</strong>: Any value</p>
            <p><strong>,</strong>: Value list separator (e.g., 1,3,5)</p>
            <p><strong>-</strong>: Range of values (e.g., 1-5)</p>
            <p><strong>/</strong>: Step values (e.g., */2 = every 2 units)</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>