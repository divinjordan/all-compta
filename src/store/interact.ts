import create from "zustand";
import { server_error_message } from "../data/data";

interface LoadingState {
  values: Record<string, boolean>;
  start: (key: string) => void;
  stop: (key: string) => void;
}

interface ErrorsState {
  values: Record<string, string[]>;
  set: (key: string, value: string | string[]) => void;
  unset: (key: string) => void;
  catch: (error: any) => void;
  reset: () => void;
}

interface NotifsState {
  values: { text: string; type: string }[];
  set: (type: string, text: string) => void;
  unset: (type: number) => void;
}

interface InteractState {
  loading: LoadingState;
  errors: ErrorsState;
  notifs: NotifsState;
}

export const useLoading = create<LoadingState>((setter) => ({
  values: {},
  start: (key) =>
    setter((state) => ({
      values: {
        ...state.values,
        [key]: true,
      },
    })),
  stop: (key) =>
    setter((state) => ({
      values: {
        ...state.values,
        [key]: false,
      },
    })),
}));

export const useErrors = create<ErrorsState>((set) => ({
  values: {},
  set: (key, value) =>
    set((state) => ({
      values: {
        ...state.values,
        [key]: typeof value == "string" ? [value] : value,
      },
    })),
  unset: (key) =>
    set((state) => ({
      values: Object.fromEntries(
        Object.entries(state.values).filter(([k, v]) => k != key)
      ),
    })),
  catch: (error) => {
    // Error has a response property
    if (error.hasOwnProperty("response")) {
      if (error.response.status == 422) {
        set(() => ({
          values: error.response.data.errors,
        }));
        return 0;
      }
    }

    // Error error is string message.
    if (typeof error == "string") {
      set(() => ({
        values: {
          message_error: [error],
        },
      }));
      return 0;
    }

    // If nothing
    set(() => ({
      values: {
        server_error: [server_error_message],
      },
    }));
  },
  reset: () => {
    set(() => ({
      values: {},
    }));
  },
}));

export const useNotifs = create<NotifsState>((setter) => ({
  values: [],
  set: (type, text) =>
    setter((state) => ({ values: [{ type, text }, ...state.values] })),
  unset: (index) =>
    setter((state) => ({
      values: state.values.filter((item, i) => i != index),
    })),
}));
