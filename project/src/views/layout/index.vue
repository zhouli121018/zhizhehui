<template>
    <div class="app_main">
        <transition>
            <div>
                <keep-alive>
                    <router-view v-if="$route.meta.cache"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.cache"></router-view>
            </div>
            
        </transition>
    </div>
</template>
<script>
export default {
    computed: {
        cachViews ()  {
            console.log(this.$store.state.app.cachViews)
            return this.$store.state.app.cachViews 
        }
    },
    
}
</script>

<style>

</style>
