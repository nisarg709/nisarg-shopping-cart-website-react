import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
  SUB_CATEGORY_LIST_FAIL,
} from '../constants/categoryConstants';

function categoryListReducer(state = { category: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, category: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function subCategoryListReducer(state = { subCategory: [] }, action) {
  switch (action.type) {
    case SUB_CATEGORY_LIST_REQUEST:
      return { loading: true, subCategory: [] };
    case SUB_CATEGORY_LIST_SUCCESS:
      return { loading: false, subCategory: action.payload };
    case SUB_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  categoryListReducer,
  subCategoryListReducer,
};
