import { DROPDOWN_TOGGLE, FIND_BY_CATEGORY_BEGINS, FIND_BY_CATEGORY_ERROR, FIND_BY_CATEGORY_SUCCESS, HIDE_CHAT_BOX, OPEN_FILTER_MODAL, POSTAD_BEGINS, POSTAD_ERROR, POSTAD_SUCCESS, REGISTRATION_BEGINS, REGISTRATION_ERROR, REGISTRATION_SUCCESS, SET_ACTIVE_CATEGORY, SET_ACTIVE_CHAT, SET_ACTIVE_SCHOOL, SET_CURRENT_CHAT, SET_CURRENT_USER, SET_SECOND_USER_ID } from "./Actions";

export default function reducer(state, { type, payload }) {

  if (type === REGISTRATION_BEGINS) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (type === REGISTRATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (type === REGISTRATION_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (type === POSTAD_BEGINS) {
    return {
      ...state,
      isLoading: true,
      adPostedSuccessfully: false,
      adPostFailed: false
    }
  }

  if (type === POSTAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      adPostedSuccessfully: payload.status,
      adPostFailed: false
    }
  }

  if (type === POSTAD_ERROR) {
    return {
      ...state,
      isLoading: false,
      adPostedSuccessfully: false,
      adPostFailed: payload.status
    }
  }
  
  if (type === FIND_BY_CATEGORY_BEGINS) {
    return {
      ...state,
      isLoading: true,
      isError: false
    }
  }

  if (type === FIND_BY_CATEGORY_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isError: false
    }
  }

  if (type === FIND_BY_CATEGORY_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true
    }
  }

  if (type === SET_CURRENT_USER) {
    return {
      ...state,
      currentUser: {
        email: payload.email,
        token: payload.token,
        userId: payload.userId,
        phone: payload.phone,
      }
    }
  }

  if (type === SET_ACTIVE_CATEGORY) {
    return {
      ...state,
      activeCategory: payload.value
    }
  }
  if (type === SET_ACTIVE_SCHOOL) {
    return {
      ...state,
      activeSchool: payload.value
    }
  }

  if (type === SET_SECOND_USER_ID) {
    return {
      ...state,
      secondUserId: payload.id
    }
  }

  if (type === SET_CURRENT_CHAT) {
    return {
      ...state,
      currentChat: payload.chat,
      secondUserId: payload.receiverId
    }
  }

  if (type === HIDE_CHAT_BOX) {
    return {
      ...state,
      hideChatBox: payload.value
    }
  }
  if (type === OPEN_FILTER_MODAL) {
    return {
      ...state,
      filterModalIsOpen: payload.value
    }
  }

  if (type === DROPDOWN_TOGGLE) {
    return {
      ...state,
      toggleDropdown: payload.value
    }
  }
}

