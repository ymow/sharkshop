<script lang="ts" setup>
import { ref } from 'vue'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'

const title = 'Blog Page'
// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: 'Blog',
  meta: [
    {
      name: 'description',
      content: 'blog description',
    },
  ],
}))

const { getItems } = useDirectusItems()
const { fileUrl } = useFiles()

const pages = ref([])
const articlesOfCategory = [
  '*',
  'articles.id',
  'articles.title',
  'articles.author.avatar',
  'articles.author.last_name',
  'articles.cover_image',
]

pages.value = await getItems({
  collection: 'news_categories',
  params: {
    fields: articlesOfCategory,
  },
})
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.blog.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <div class="relative max-w-4xl px-6 pt-12 pb-24 mx-auto space-y-8">
          <header
            class="relative overflow-hidden rounded-tr rounded-bl bg-gradient-to-br from-slate-900 to-slate-700
            shadow-primary-600 rounded-tl-3xl rounded-br-3xl"
          >
            <div class="md:flex md:justify-between">
              <h1 class="px-8 py-6 text-4xl font-extrabold text-white">
                {{ title }}
              </h1>
              <div class="flex items-center justify-end p-4 space-x-2">
                <NuxtLink to="/blog" target="_blank" class="p-1 text-primary-200 hover:text-primary-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" class="text-yellow-400 h-16 w-16" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21
                         12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>
            <div class="w-full h-4 bg-gradient-to-r from-primary-700 via-primary-600 to-pink-600" />
          </header>
          <div class="">
            <TabGroup>
              <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab v-for="category in pages" v-slot="{ selected }" :key="category" as="template">
                  <button
                    class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" :class="[
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                    ]"
                  >
                    {{ category.name }}
                  </button>
                </Tab>
              </TabList>

              <TabPanels class="mt-2">
                <TabPanel
                  v-for="category in pages" :key="category" as="template" class="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                >
                  <ul>
                    <li
                      v-for="post in category.articles" :key="post.id"
                      class="relative rounded-md p-3 hover:bg-gray-100"
                    >
                      <PageCard
                        :path="`/${post.id}`" :image="fileUrl(post.cover_image)" :title="post.title"
                        :description="`/${post.author.last_name}`"
                      />
                      <h3 class="text-sm font-medium leading-5">
                        {{ post.title }}
                      </h3>
                      <ul class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                        <li>{{ post.author.last_name }}</li>
                      </ul>

                      <!-- <a href="{{ post.author.last_name }}" :class="[
                      'absolute inset-0 rounded-md',
                      'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                    ]" /> -->
                    </li>
                  </ul>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
