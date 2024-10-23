import { AppDispatch, StoreState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = () => useDispatch.withTypes<AppDispatch>()();
