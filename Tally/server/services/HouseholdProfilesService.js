import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class HouseholdProfilesService {
  /** creates new household profile object when a user joins a household
   * @param {Object} body - need the id of the household to be joined and the id of the profile of trying to join.
   * @param {String} accessKey - the access key to join the household
   * @returns new household profile object
  */
  async createHouseholdProfile(body, accessKey) {
    const household = await dbContext.Households.find(body.householdId)
    if (household.accessKey === accessKey) {
      return await dbContext.HouseholdProfiles.create(body)
    }
    throw new BadRequest('Failed to join household')
  }

  /**
  * deletes a household profile object. Used to "kick" a user out of a household
  * @param {Object} body - need the id of the household to be edited and the id of the profile to be kicked
  * @param {String} userId - id of the logged in user making the request
  * @returns successfully deleted message
  */
  async destroyHouseholdProfile(body, userId) {
    const household = await dbContext.Households.findById(body.householdId)
    if (household.ownerAccountId === userId) {
      await dbContext.HouseholdProfiles.findByIdAndDelete(body.id)
    } else {
      throw new Forbidden('This is not your household')
    }
    return 'Successfully Deleted'
  }

  async getProfilesByHouseholdId(householdId) {
    const profiles = await dbContext.HouseholdProfiles.find({ householdId: householdId }).populate('creator', 'name picture')
    if (!profiles) {
      throw new BadRequest('Invalid Id')
    }
    return profiles
  }

  async getHouseholdsByProfileId(accountId) {
    const households = await dbContext.HouseholdProfiles.find({ accountId: accountId }).populate('household', 'name id')
    if (!households) {
      throw new BadRequest('Invalid Id')
    }
    return households
  }
}
export const householdProfilesService = new HouseholdProfilesService()
