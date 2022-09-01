<template>
<div class="q-ma-md">
  <div class="row justify-between text-h3 text-dark">
    <div v-if="toggles['Clock']" class="col-auto">
      {{ timeAsClock }}
    </div>
    <div v-if="toggles['Time Left']" class="col-auto">
      {{ currentBlock }}
    </div>
  </div>
  <div class="row justify-between text-h4 text-grey-7">
    <div v-if="toggles['Date']" class="col-auto">
      {{ timeAsDate }}
    </div>
    <div v-if="special_schedule && toggles['Special Schedule Indicator']" class="col-auto">
      SPECIAL SCHEDULE
    </div>
  </div>

  <div class="col">
    <div
      v-for="(start_end, block) of scheduleDictionary"
      :key="block"
      class="row q-ma-lg"
    >
        <q-linear-progress class="bg-grey-3" size="25px" :color="getColorCode(barColor)" :value="getProgress(block)" style="border-radius: 50px">
          <div class="row justify-between text-dark text-subtitle1 absolute-full">
            <div class="col-auto q-ml-sm">
              {{ getCustomName(block) }}
            </div>
            <div class="col-auto q-mr-sm">
              {{ formatTime(start_end['start']) }} - {{ formatTime(start_end['end']) }}
            </div>
          </div>
        </q-linear-progress>
    </div>
  </div>

  <div class="row q-ma-lg">
    <div class="col-auto q-mx-sm">
      <q-btn-dropdown :color="getColorCode(buttonColors['Links'])" label="Useful Links" rounded no-caps>
        <q-list>
          <q-item clickable v-close-popup href="https://www.bayschoolsf.org/" target="_blank">
            <q-item-section>
              <q-item-label>Bay Site</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup href="https://bayschoolsf.instructure.com/" target="_blank">
            <q-item-section>
              <q-item-label>Canvas</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup href="https://bayschoolsf.myschoolapp.com/" target="_blank">
            <q-item-section>
              <q-item-label>My Bay</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup href="https://docs.google.com/document/d/1c5YzT06GTn5CdX_7X7jZ2Ghhd5pK1aHhRRbOY78cr2M/edit" target="_blank">
            <q-item-section>
              <q-item-label>Announcements Digest</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div class="col-auto q-mx-sm">
      <q-btn :color="getColorCode(buttonColors['Menu'])" label="Lunch Menu" @click="lunchModal = true" rounded no-caps />
    </div>
    <div class="col-auto q-mx-sm">
      <q-btn :color="getColorCode(buttonColors['Schedule'])" label="Custom Schedule" @click="scheduleModal = true" rounded no-caps />
    </div>
    <div class="col-auto q-mx-sm">
      <q-btn :color="getColorCode(buttonColors['Styles'])" label="Customize" @click="styleModal = true" rounded no-caps />
    </div>
  </div>

  <q-dialog v-model="lunchModal">
    <q-card style="width: 900px; max-width: 80vw;">
      <q-img src="https://www.bayclock.org/img/1.f34c488c.jpg" />
    </q-card>
  </q-dialog>

  <q-dialog 
    v-model="scheduleModal"
    @shake="scheduleShake"
    persistent
  >
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section class="text-h5">
        Custom Schedule
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="setSchedule"
          @reset="resetSchedule"
          class="q-gutter-md"
        >
          <q-input
            v-for="block of Object.keys(tempSchedule)"
            :key="block"
            :label="block"
            v-model="tempSchedule[block]"
            dense
            rounded
            outlined
          >
          </q-input>
          <q-btn
            label="Sports/Activities Schedule"
            color="primary"
            @click="activityModal = true"
            push
          />
          <div>
            <q-btn label="Save" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn label="Cancel" @click="scheduleModal = false" color="negative" flat class="float-right" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog 
    v-model="activityModal"
  >
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section>
        <div class="row text-center q-ma-sm">
          <div
            v-for="day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']"
            :key="day"
            class="col"
          >
            <h6>{{ day }}</h6>
            <q-input filled v-model="time" mask="time" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="time">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <p>to</p>
            <q-input filled v-model="time" mask="time" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="time">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <div class="q-pa-lg">
        <q-btn label="Save" @click="setStyles" color="primary"/>
        <q-btn label="Reset" @click="resetStyles" color="primary" flat class="q-ml-sm" />
        <q-btn label="Cancel" @click="styleModal = false" color="negative" flat class="float-right" />
      </div>
    </q-card>
  </q-dialog>

  <q-dialog 
    v-model="styleModal"
    @shake="stylesShake"
    persistent
  >
    <q-card style="width: 900px; max-width: 80vw;">
      <q-card-section class="text-h5">
        Custom Styles - {{ styleTab.charAt(0).toUpperCase() + styleTab.slice(1) }}
      </q-card-section>
      <q-card-section>
        <q-splitter v-model="styleSplitter" disable>
          <template v-slot:before>
            <q-tabs v-model="styleTab" vertical no-caps class="text-h6">
              <q-tab name="colors" label="Colors" />
              <q-tab name="toggles" label="Toggles" />
              <q-tab name="other" label="Other" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="styleTab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="colors" class="q-pt-none">
                <div>
                  <h6 class="q-mb-none">Progress Bar Color</h6>
                  <div class="col-auto q-gutter-sm">
                    <q-btn 
                      v-for="(color, hex) of colorPalette"
                      :key="color"
                      :color="color"
                      @click="tempBarColor = hex"
                      :icon="_.isEqual(tempBarColor, hex) ? 'check' : ''"
                      push
                    />
                    <q-btn icon="palette" paddig="md" push>
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-color 
                          v-model="tempBarColor"
                          default-view="palette"
                          :palette="Object.keys(customColorPalette)"
                          no-footer
                          no-header-tabs
                          style="max-width:250px"
                        /> 
                      </q-popup-proxy>
                    </q-btn> 
                  </div>
                </div>
                <div>
                  <h6 class="q-mb-none">Button Colors</h6>
                  <div class="row q-gutter-sm">
                    <div class="col-auto">
                      <q-select v-model="colorBeingChosen" :options="Object.keys(buttonColors)" dense />
                    </div>
                    <div class="col-auto q-gutter-sm">
                      <q-btn 
                        v-for="(color, hex) of colorPalette"
                        :key="color"
                        :color="color"
                        @click="tempButtonColors[colorBeingChosen] = hex"
                        :icon="_.isEqual(tempButtonColors[colorBeingChosen], hex) ? 'check' : ''"
                        push
                      />
                      <q-btn icon="palette" paddig="md" push>
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-color 
                            v-model="tempButtonColors[colorBeingChosen]"
                            default-view="palette"
                            :palette="Object.keys(customColorPalette)"
                            no-footer
                            no-header-tabs
                            style="max-width:250px"
                          /> 
                        </q-popup-proxy>
                      </q-btn> 
                    </div>
                  </div>
                </div>
                <div>
                  <h6 class="q-mb-none">Dark Mode</h6>
                  <div class="col-auto">
                    <q-toggle
                      v-model="dark_mode"
                      @update:model-value="$q.dark.toggle()"
                      color="primary"
                      label="Dark Mode"
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="toggles">
                <div class="q-gutter-md">
                  <q-toggle
                    v-for="(state, name) of tempToggles"
                    :key="name"
                    v-model="tempToggles[name]"
                    color="primary"
                    :label="name"
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel name="other">
                <q-toggle
                  v-model="tempDetailedTime"
                  color="primary"
                  label="Detailed Time Left"
                />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </q-card-section>
      <div class="q-pa-lg">
        <q-btn label="Save" @click="setStyles" color="primary"/>
        <q-btn label="Reset" @click="resetStyles" color="primary" flat class="q-ml-sm" />
        <q-btn label="Cancel" @click="styleModal = false" color="negative" flat class="float-right" />
      </div>
    </q-card>
  </q-dialog>

  <div class="fixed-bottom text-center q-pa-md">
    <p class="q-ma-none">Coded by <a href="https://lucaskchang.com">Lucas Chang</a></p>
    <p class="q-mt-sm"><a href="@/peepeepoopoo">Source</a> / Tools / Bug Report</p>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import { useQuasar, colors } from 'quasar';
import schedule from '../data/schedule.json';
import colorArray from '../data/colors.json';
import _ from 'lodash';

const $q = useQuasar(); // Quasar instance
const dark_mode = ref(false) // Dark mode state
const special_schedule = ref(false) // Special schedule state
const time = ref(new Date()); // Current date

const tempSchedule = ref({}) // Temporary schedule
const customSchedule = ref({ // Custom schedule
  'A': 'A',
  'B': 'B',
  'C': 'C',
  'D': 'D',
  'E': 'E',
  'F': 'F',
})

const lunchModal = ref(false); // Lunch menu modal state
const scheduleModal = ref(false); // Custom schedule modal state
const styleModal = ref(false); // Style modal state
const styleTab = ref('colors'); // Style tab
const styleSplitter = ref(10); // Style splitter
const activityModal = ref(false); // Activity Modal State

const colorPalette = ref({ // Basic color palette
  '#58a5dd': 'primary',
  '#f14e9d': 'secondary',
  '#48b646': 'positive',
  '#f34933': 'negative',
  '#f36e22': 'warning'
})
const tempBarColor = ref('');
const tempButtonColors = ref({});
const barColor = ref(colors.getPaletteColor('primary')); // Bar color
const buttonColors : Ref<{ [key: string]: string }> = ref({
  'Links': '',
  'Menu': '',
  'Schedule': '',
  'Styles': ''
});
const colorBeingChosen = ref('Links')

const tempToggles = ref({});
const toggles = ref({ // Toggles for top bar
  'Clock': true,
  'Date': true,
  'Time Left': true, 
  'Special Schedule Indicator': true
})
const tempDetailedTime = ref({});
const detailedTime = ref(false);

// Return the current day's schedule
const scheduleDictionary = computed(function() {
  let now = time.value;
  let unparsedDaySchedule = schedule[time.value.getDay()];
  let parsedDaySchedule = {};
  for (const [block, start_end] of Object.entries(unparsedDaySchedule)) {;
    parsedDaySchedule[block] = {
      start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), start_end['start']['hour'], start_end['start']['minute']),
      end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), start_end['end']['hour'], start_end['end']['minute'])
    };
  }
  return parsedDaySchedule;
});

// Returns color palette
const customColorPalette = computed(function() {
  let color_palette = {};
  for (let color of colorArray) {
    color_palette[colors.getPaletteColor(color)] = color;
  }
  return color_palette
})

// Get the current time in the format HH:MM:SS
const timeAsClock = computed(function() {
      let now = time.value;
      let hours = now.getHours();
      let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
      let seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
      let meridiem = 'AM';
      if (hours > 11) {
        if (hours != 12){
          hours -=12
        }
        meridiem = 'PM';
      }

      return `${hours}:${minutes}:${seconds}${meridiem}`;
});
// Get the current date
const timeAsDate = computed(function() {
      return time.value.toDateString();
});

// Get the current block
const currentBlock = computed(function() {
  if (Object.keys(scheduleDictionary.value).length == 0) { // Weekend
    return 'Weekend';
  }
  let now = time.value;
  if (scheduleDictionary.value[Object.keys(scheduleDictionary.value)[0]]['start'] > now) { // start time of first block
    return 'Before School';
  } else if (scheduleDictionary.value[Object.keys(scheduleDictionary.value)[Object.keys(scheduleDictionary.value).length - 1]]['end'] < now) { // end time of last block
    return 'School is over'
  }
  for (const start_end of Object.values(scheduleDictionary.value)) {
    if (now >= start_end['start'] && now <= start_end['end']) {
      // Return time left in block
      let time_left= start_end['end'].getTime() - now.getTime()
      if (detailedTime.value) {
        let hours = Math.floor(time_left/3600000) == 0 ? '' : Math.floor(time_left/3600000) + ':'
        let minutes = Math.floor(time_left%3600000/60000) < 10 ? '0' + Math.floor(time_left%3600000/60000) : Math.floor(time_left%3600000/60000)
        let seconds = Math.floor(time_left%3600000%60000/1000) + 1 < 10 ? '0' + (Math.floor(time_left%3600000%60000/1000) + 1) : Math.floor(time_left%3600000%60000/1000) + 1
        return `${hours}${minutes}:${seconds} left`
      } else {
        let minutes = Math.floor(time_left / 60000) + 1;
        return `${minutes} minutes left`;
      }
    }
  }
  return 'Passing';
});

// Return input in HH:MM format
function formatTime(date: Date): string {
      let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      return `${hour}:${minute}`;
}

// Return value between 0 and 1 as progress for given block
function getProgress(block: string): number {
  let now = time.value;
  let start = scheduleDictionary.value[block]['start'];
  let end = scheduleDictionary.value[block]['end'];
  if (now < start) {
    return 0;
  } else if (now > end) {
    return 1;
  } else {
    return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
  }
}

// Return custom name of block if available
function getCustomName(block: string): string {
  return customSchedule.value[block] || block;
}

function getColorCode(color: string): string {
  if (Object.keys(colorPalette.value).includes(color)) {
    return colorPalette.value[color];
  } else {
    return customColorPalette.value[color];
  }
}

// Create a copy schedule to preserve original
watch(scheduleModal, function(val) {
  if (val) {
    tempSchedule.value = {
      'A': customSchedule.value['A'],
      'B': customSchedule.value['B'],
      'C': customSchedule.value['C'],
      'D': customSchedule.value['D'],
      'E': customSchedule.value['E'],
      'F': customSchedule.value['F']
    }
  }
})

// Set the custom schedule
function setSchedule() {
  customSchedule.value = tempSchedule.value;
  scheduleModal.value = false;
}

// Reset the schedule
function resetSchedule() {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to reset all settings to their defaults?',
    cancel: true
  }).onOk(() => {
    tempSchedule.value = {
      'A': 'A',
      'B': 'B',
      'C': 'C',
      'D': 'D',
      'E': 'E',
      'F': 'F',
    }
  })
}

function scheduleShake() {
  if (_.isEqual(tempSchedule.value, customSchedule.value)) {
    scheduleModal.value = false;
  } else {
    $q.notify({
      message: 'You have unsaved changes!',
      color: 'negative',
      position: 'bottom-right',
      icon: 'close',
      timeout: 1000,
      group: false
    })
  }
}

watch(styleModal, function(val) {
  if (val) {
    tempBarColor.value = barColor.value
    tempButtonColors.value = {
      'Links': buttonColors.value['Links'],
      'Menu': buttonColors.value['Menu'],
      'Schedule': buttonColors.value['Schedule'],
      'Styles': buttonColors.value['Styles']
    }
  }
  tempToggles.value = {
    'Clock': toggles.value['Clock'],
    'Date': toggles.value['Date'],
    'Time Left': toggles.value['Time Left'], 
    'Special Schedule Indicator': toggles.value['Special Schedule Indicator']
  }
  tempDetailedTime.value = detailedTime.value
})

function setStyles() {
  barColor.value = tempBarColor.value;
  buttonColors.value = tempButtonColors.value;
  toggles.value = tempToggles.value;
  detailedTime.value = tempDetailedTime.value;
  styleModal.value = false
}

function resetStyles() {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to reset all settings to their defaults?',
    cancel: true
  }).onOk(() => {
    tempBarColor.value = colors.getPaletteColor('primary');
    tempButtonColors.value = {
      'Links': '',
      'Menu': '',
      'Schedule': '',
      'Styles': ''
    }
    tempToggles.value = {
      'Clock': true,
      'Date': true,
      'Time Left': true, 
      'Special Schedule Indicator': true
    }
    tempDetailedTime.value = false
  })
}

function stylesShake() {
  if (_.isEqual(tempBarColor.value, barColor.value) && _.isEqual(tempButtonColors.value, buttonColors.value) && _.isEqual(tempToggles.value, toggles.value) && _.isEqual(tempDetailedTime.value, detailedTime.value)) {
    styleModal.value = false;
  } else {
    $q.notify({
      message: 'You have unsaved changes!',
      color: 'negative',
      position: 'bottom-right',
      icon: 'close',
      timeout: 1000,
      group: false
    })
  }
}

// Update the time every second
setInterval(() => {
  time.value = new Date();
}, 1000);
</script>
