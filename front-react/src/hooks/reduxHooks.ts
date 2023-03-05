import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RdxRootState, RdxAppDispatch } from "../state/store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => RdxAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RdxRootState> = useSelector
