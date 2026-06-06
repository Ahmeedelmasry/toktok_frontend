<template>
  <v-card :class="{ 'pb-2': hideFooter }" color="#F3F3F3" flat class="pt-5">
    <div class="heading d-flex align-center justify-space-between mb-7" v-if="showHeading">
      <h2 class="text-primary">{{ title }}</h2>
      <v-btn
        flat
        color="primary"
        height="45"
        @click="$emit('createNew')"
        class="text-none weight-5 font-16"
      >
        {{ btn }}
      </v-btn>
    </div>

    <div class="heading d-flex align-center justify-space-between mb-5" v-if="!hideHeading">
      <h2 class="font-24 text-dark">{{ title }}</h2>
      <div class="d-flex ga-1">
        <slot name="filter" />
        <v-btn
          v-if="!hideCreate"
          class="font-16 weight-5 text-none"
          flat
          rounded="lg"
          color="orange-darken-2"
          @click="$emit('createAction')"
          height="45"
        >
          Create {{ title.replace('s', '') }}
        </v-btn>
      </div>
    </div>
    <v-data-table
      :items="items"
      :headers="getHeaders"
      :loading="loading"
      :items-per-page="items.length || meta.limit"
      id="printable"
      :mobile="smAndDown ? true : false"
    >
      <template #[`item.${slot}`]="item" v-for="slot in slots" :key="slot">
        <slot :name="slot" :item="item.item" />
      </template>
      <template #[`item.actions`]="item">
        <v-btn color="primary" size="small" flat :id="`row_actions_${item.index}`">
          <v-icon size="20">mdi-dots-vertical</v-icon>
        </v-btn>
        <v-menu :activator="`#row_actions_${item.index}`" transition="slide-y-transition">
          <v-list elevation="3" class="ps-2">
            <v-list-item @click="$emit('update', item.item)" v-if="!hideUpdate" close-on-click>
              <div class="d-flex ga-3 align-center">
                <span>Update</span>
                <v-icon>mdi-pencil</v-icon>
              </div>
            </v-list-item>
            <v-list-item @click="$emit('delete', item.item)" close-on-click>
              <div class="d-flex ga-3 align-center">
                <span>Delete</span>
                <v-icon>mdi-trash-can</v-icon>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template #bottom>
        <div
          v-if="pagination && pagination.totalPages >= 1 && !hideFooter"
          class="d-flex mt-4 justify-space-between table-pagination table_per_page pt-5"
          style="background-color: rgb(239 239 239 / 43%)"
        >
          <div class="d-flex ga-4 align-center me-5">
            <v-btn
              elevation="0"
              color="grey-lighten-3"
              id="openPerPage"
              class="border"
              :readonly="loading"
              >{{ meta.limit }}

              <v-menu activator="parent">
                <v-list elevation="1" v-model:selected="meta.limit" item-value="item">
                  <v-list-item
                    v-for="item in [10, 20, 50, 100]"
                    :key="item"
                    :title="item"
                    @click="
                      (meta.limit = item),
                        (meta.page = 1),
                        $emit('getData', {
                          page: meta.page,
                          limit: meta.limit
                        })
                    "
                  ></v-list-item>
                </v-list> </v-menu
            ></v-btn>
          </div>
          <div class="d-flex align-center ga-4 overflow-x-auto overflow-y-hidden">
            <div class="d-flex align-center ga-2">
              <button
                v-for="p in pagination.totalPages"
                :key="p"
                class="pagination-btn"
                @click="changePage(p)"
                :class="{ active: meta.page == p }"
              >
                {{ p }}
              </button>
            </div>
            <!-- <v-pagination
              :model-value="meta.page"
              class="max-h"
              v-model="meta.page"
              :length="pagination.totalPages"
              :total-visible="5"
              size="36px"
              @update:modelValue="changePage($event)"
            >
              <template #next>
                <button
                  @click="
                    meta.page++,
                      $emit('getData', {
                        page: meta.page,
                        limit: meta.limit
                      })
                  "
                  class="d-flex align-center ga-2 arrow-btn"
                  :disabled="pagination.current_page === pagination.last_page"
                >
                  <span>
                    <v-icon class="mt-2">mdi-chevron-right</v-icon>
                  </span>
                </button>
              </template>
              <template #prev>
                <button
                  @click="
                    meta.page--,
                      $emit('getData', {
                        page: meta.page,
                        limit: meta.limit
                      })
                  "
                  class="d-flex align-center ga-2 arrow-btn"
                  :disabled="pagination.current_page === 1"
                >
                  <span>
                    <v-icon class="mt-2">mdi-chevron-left</v-icon>
                  </span>
                </button>
              </template>
            </v-pagination> -->
            <div class="font-16">{{ pagination.page }} of {{ pagination.totalPages }} pages</div>
          </div>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { smAndDown } = useDisplay()

const emits = defineEmits(['getData'])

const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  },
  slots: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  hideUpdate: {
    type: Boolean,
    default: false
  },
  hideHeading: {
    type: Boolean,
    default: false
  },
  hideCreate: {
    type: Boolean,
    default: false
  },
  showHeading: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  btn: {
    type: String,
    default: ''
  },
  pagination: {
    type: Object,
    default: () => ({})
  },
  meta: {
    type: Object,
    default: () => ({})
  }
})

const getHeaders = computed(() => {
  const headersWithoutSort = props.headers.map((el) => {
    return { ...el, sortable: false }
  })
  return headersWithoutSort
})

const changePage = (event) => {
  if (props.meta.page != event) {
    props.meta.page = event
    emits('getData', {
      page: event,
      limit: props.meta.limit
    })
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss">
@media print {
  .table-pagination {
    display: block !important;
    opacity: 0 !important;
  }
}
.table_per_page {
  .v-select {
    background-color: #5e636614 !important;
  }
}
.per-page-select {
  padding: 0 !important;
}
.pagination-btn {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  &.active {
    background-color: rgb(255, 145, 0) !important;
    color: white !important;
  }
}
</style>
