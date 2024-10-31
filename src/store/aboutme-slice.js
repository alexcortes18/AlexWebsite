import { createSlice } from "@reduxjs/toolkit";

export const sections = ["Honduras", "NTHU"]

const aboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState: { activeSection: 0, section: "Honduras" },
    reducers: {
        nextSection(state) {
            if (state.activeSection >= 0) {
                state.activeSection += 1;
                state.section = sections[state.activeSection];
            }
        },
        lastSection(state) {
            if (state.activeSection <= sections.length - 1){
                state.activeSection -= 1;
                state.section = sections[state.activeSection];
            }
        }
    }
});

export default aboutMeSlice;
export const aboutMeActions = aboutMeSlice.actions;