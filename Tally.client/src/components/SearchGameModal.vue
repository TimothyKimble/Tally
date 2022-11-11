<template>
  <!-- Modal -->
  <div class="modal fade side-bar-scroll"
       id="searchGameModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog bg-warning modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Search for Games
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="searchGame()" class="d-flex align-items-start flex-row">
            <div class="form-group w-75 mr-auto">
              <input type="text"
                     name="search"
                     v-model="state.search"
                     class="form-control"
                     placeholder="Search for games..."
                     aria-describedby="searchHelpId"
                     maxlength="25"
              >
              <small id="searchHelpId" class="text-dark">Search for games to add to your game cabinet!</small>
            </div>
            <button type="submit" class="btn btn-primary">
              Search
            </button>
          </form>
          <div v-for="g in activeSearchGames" :key="g.id">
            <SearchGameCard :search-game="g" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Pop from '../utils/Notifier'
import { gamesService } from '../services/GamesService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      search: ''
    })
    return {
      state,
      activeSearchGames: computed(() => AppState.activeSearchGames),
      async searchGame() {
        try {
          await gamesService.searchGame(state.search)
          state.search = ''
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar-scroll{
  overflow-y: auto;
  max-height: 85vh;
}
</style>
