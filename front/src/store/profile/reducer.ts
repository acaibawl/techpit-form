import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";

const init: Profile = {
  name: "",
  description: "",
  birthday: "",
  gender: "",
  address: {
    postalcode: "",
    prefecture: "",
    city: "",
    restAddress:""
  }
};

const profileReducer = reducerWithInitialState(init)
.case(profileActions.setProfile, (state, payload) => ({
    // 元の状態を表すstateを新しく渡された状態を表すpayloadで上書きした状態を返す
    ...state,
    ...payload
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    // addressの内容だけ新しい状態で更新
    ...state,
    address: { ...state.address, ...payload}
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result }
  })
);

export default profileReducer;
