<template>
    <div class="index-page">
        <Shorter />
        <History />
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import Shorter from '@/components/Shorter.vue'
import History from '@/components/History.vue'

export default defineComponent({
    name: 'Index',
    components: {
        Shorter,
        History
    }
})
</script>
<style lang="scss" scoped>
.index-page{
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
}
</style>
