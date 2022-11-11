<template>
  <div class="row m-0 my-3">
    <div class="col-md-12 col-7 p-0 d-flex align-items-center justify-content-around">
      <img class="thumbUrl p-1" :src="game.smallImg" alt="">
      <h2 class="m-0 p-3" type="button" data-toggle="modal" :data-target="'#gameDetails'+game.id" title="showGameDetails">
        {{ game.name }}
      </h2>
      <button type="button" class="btn btn-warning" @click="removeGame(game.id)">
      Remove
    </button>
    </div>
  </div>
  <GameDetailsModal :game="game" />
</template>

<script>
import { gamesService } from '../services/GamesService'
import Pop from '../utils/Notifier'
import { reactive, onMounted, computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'

export default {
  name: 'GameCabinetItem',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    return {
      games: computed(() => AppState.games),
      async removeGame(id) {
        try {
          await gamesService.removeGame(id)
          Pop.toast("Game Removed", "success")
          await gamesService.getGamesByHouseholdId(route.params.id)
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbUrl {
  height: 15vh;
  width: 15vh;
  object-fit: cover;
  object-position: center;
}
</style>
