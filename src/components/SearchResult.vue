<template>
    <div class="searchResult">
        <search-nav  :whetherShowTypeButton="true" :rightType="'backButton'"></search-nav>
        <div class="resultList">
            <ul>
                <li v-for="result in getSearchResults">
                    <div class="resultItemContent">
                        <img src="#" width="60px" height="60px" style="float: left;">
                        <div class="resultItemContentDest">
                            <p><strong>{{result.title}}</strong></p>
                            <p>{{result.desc}}</p>
                        </div>
                    </div>
                    <div style="clear: both;"></div>
                    <div class="resultItemNav">
                        <div data-id="{{result.id}}" @click="setToStart">设为起点</div>
                        <div data-id="{{result.id}}" @click="setToDest">去这里</div>
                        <div data-id="{{result.id}}" @click="routeToDetail">详情</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import SearchNav from './SearchNav'
    import { getSearchResults, getPromptDisplay } from '../getters'
    import { setDisplayDetail, showDetail } from '../actions/detail'

    export default {
        components: {
            SearchNav,
        },
        vuex: {
            getters: {
                getSearchResults,
                getPromptDisplay
            },
            actions: {
                setDisplayDetail,
                showDetail
            }
        },
        methods: {
            setToStart (e) {
                let id = e.target.dataset.id

            },
            setToDest (e) {
                let id = e.target.dataset.id
                
            },
            routeToDetail (e) {
                let that = this
                let id = e.target.dataset.id
                for (let item of that.getPromptDisplay) {
                    if (item.id == id) {
                        that.setDisplayDetail(item)
                        that.showDetail()
                        break
                    }
                }
            }
        }
    }
</script>
<style>
    .searchResult {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9998;
    }
    .resultList {
        margin-top: 40px;
        padding: 10px;
        width: 100%;
        height: calc(100% - 60px);
        overflow: scroll;
    }
    .resultList ul {
        list-style: none;
        overflow: scroll;
    }
    .resultList ul li {
        margin-right: 10px;
        width: calc(100% - 20px);
        min-height: 100px;
        background: rgba(200, 200, 200, 0.3);
        padding: 20px 10px 0;
        box-sizing: border-box;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
    }
    .resultItemContent {
        width: 100%;
        margin-bottom: 20px;
        height: auto;
        overflow: hidden;
    }
    .resultItemNav {
        width: 100%;
        height: 40px;
        background: white;
        line-height: 40px;
        display: flex;
        border-top: 1px solid #bbb;
    }
    .resultItemContentDest {
        margin-left: 10px;
        width: calc(100% - 70px);
        float: left;
    }
    .resultItemNav div {
        text-align: center;
        line-height: 40px;
        flex: 1;
        display: inline-block;
    }
</style>