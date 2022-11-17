<script setup lang="ts">
const { createItems } = useDirectusItems()

interface Article {
  id?: string | number
  title: string
  content: string
  status: string
}

const createArticles: Article[] = async () => {
  try {
    const items: Article[] = [
      {
        title: 'testitem',
        content: 'testcontent',
        status: 'published',
      },
    ]
    await createItems<Article>({ collection: 'News', items })
  }
  catch (e) {}
}
</script>

<template>
  {{ createArticles }}
  <div class="mt-10 flex">
    <n-button
      class="btn btn-primary"
      strong
      secondary
      type="success"
      @click="createArticles"
    >
      Add to Cart
    </n-button>
  </div>
</template>
