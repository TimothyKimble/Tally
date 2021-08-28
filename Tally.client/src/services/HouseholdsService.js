import { AppState } from '../AppState'
import { accountService } from './AccountService'
import { tallyApi } from './AxiosService'

class HouseholdsService {
  async getMyHouseholdById(id) {
    const res = await tallyApi.get('account/' + id + '/myhousehold')
    AppState.myHousehold = res.data
    await accountService.getAccount()
  }

  async getHouseholdById(id) {
    const res = await tallyApi.get('api/households/' + id)
    AppState.activeHousehold = res.data
  }

  async getHouseholdByAccessKey(accessKey) {
    const res = await tallyApi.get('api/households/' + accessKey + '/accesskey')
    AppState.activeHousehold = res.data
    return res.data.id
  }

  async respinAccessKey(id) {
    const res = await tallyApi.put('api/households/' + id + '/accessKey')
    AppState.activeHousehold.accessKey = res.data
    return res.data.accessKey
  }
}

export const householdsService = new HouseholdsService()
