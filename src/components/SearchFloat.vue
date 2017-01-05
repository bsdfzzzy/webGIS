<template>
    <div class="searchFloat">
        <search-nav :whetherShowTypeButton="true" :rightType="'homePageButton'" :keyword="getKeyword"></search-nav>
        <hot v-if="getShowHot"></hot>
        <template v-if="getShowPrompt">
            <prompt></prompt>
        </template>
        <div v-if="getPromptDisplay.length == 0 && getShowPrompt" class="noResult">没有搜索结果</div>
    </div>
</template>
<script>
    import SearchNav from './SearchNav'
    import Hot from './Hot'
    import Prompt from './Prompt'
    import { getShowHot, getShowPrompt, getKeyword, getPromptDisplay } from '../getters'
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
                getShowPrompt,
                getKeyword,
                getPromptDisplay
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
        border-top: 1px solid rgba(240, 240, 240, 0.8);
    }
    .noResult {
        width: 100%;
        height: 60px;
        position: absolute;
        top: 0;
        line-height: 60px;
        padding-left: 30px;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        color: #777;
    }
</style>