/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { StoreCreator } from "./StoreCreator";
import { StoreEnhancer } from "./StoreEnhancer";
import { reduceCompoundActions } from "./reduceCompoundActions";

/**
 * Returns a store enhancer that will yield Stores that
 * reduce (unwrap) incoming compound actions automatically.
 *
 * @see CompoundAction
 * @see reduceCompoundActions
 */
export function compoundActionsEnhancer(): StoreEnhancer {
  return <S>(next: StoreCreator<S>): StoreCreator<S> => {
    return (reducer, initialState) => {
      const store = next(reduceCompoundActions(reducer), initialState);
      return {
        dispatch: store.dispatch,
        getState: store.getState,
        replaceReducer: (newReducer) => store.replaceReducer(reduceCompoundActions(newReducer)),
        subscribe: store.subscribe,
      };
    };
  };
}
