import { User } from "@/cms-types"
import { create } from 'zustand'
import {
    createJSONStorage,
    persist,
  } from 'zustand/middleware'


export type UserInformation = {
    user: User
  }
type UserInformationState = {
    items: UserInformation[]
    addItem: (user: User) => void
    removeItem: (userId: string) => void
    clearUser: () => void
}
export const useUser = create<UserInformationState>()(
    persist(
      (set) => ({
        items: [],
        addItem: (user) =>
          set((state) => {
            return { items: [...state.items, { user }] }
          }),
        removeItem: (id) =>
          set((state) => ({
            items: state.items.filter(
                  // @ts-expect-error context already passed from express middleware
              (item) => item.user.id !== id
            ),
          })),
        clearUser: () => set({ items: [] }),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )