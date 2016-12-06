<template>
    <div class="searchFloat">
        <search-nav :whetherShowTypeButton="true" :rightType="'homePageButton'"></search-nav>
        <hot v-if="getShowHot"></hot>
        <prompt v-if="getShowPrompt"></prompt>
    </div>
</template>
<script>
    import SearchNav from './SearchNav'
    import Hot from './Hot'
    import Prompt from './Prompt'
    import { getShowHot, getShowPrompt } from '../getters'
    import { closePrompt } from '../actions/prompt'
    import { showHot } from '../actions/hot'

    export default {
        components: {
            SearchNav,
            Hot,
            Prompt
        },
        vuex: {
            getters: {
                getShowHot,
                getShowPrompt
            },
            actions: {
                showHot,
                closePrompt
            }
        },
        ready: function () {
            this.showHot()
            this.closePrompt()
        }
    }
</script>
<style>
    .searchFloat {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: white;
        margin-top: 40px;
        z-index: 9997;
    }
</style>