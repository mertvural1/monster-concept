import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { compareLimit } from "@/features/products/data/product-compare-data";
import type { CompareState } from "@/features/products/interfaces/compare-state.interface";
import type { Product } from "@/shared/interfaces/product.interface";

const initialState: CompareState = {
  selectedProducts: [],
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    toggleCompareProduct: (state, action: PayloadAction<Product>) => {
      const isSelected = state.selectedProducts.some((product) => product.id === action.payload.id);

      if (isSelected) {
        state.selectedProducts = state.selectedProducts.filter((product) => product.id !== action.payload.id);
        return;
      }

      if (state.selectedProducts.length >= compareLimit) {
        return;
      }

      state.selectedProducts.push(action.payload);
    },
    removeCompareProduct: (state, action: PayloadAction<string>) => {
      state.selectedProducts = state.selectedProducts.filter((product) => product.id !== action.payload);
    },
    clearCompare: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { clearCompare, removeCompareProduct, toggleCompareProduct } = compareSlice.actions;
export const compareReducer = compareSlice.reducer;

export const selectCompareProducts = (state: RootState) => state.compare.selectedProducts;
export const selectCompareProductIds = (state: RootState) =>
  state.compare.selectedProducts.map((product) => product.id);
export const selectCanAddMoreCompareProducts = (state: RootState) =>
  state.compare.selectedProducts.length < compareLimit;
