// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  AutocompleteState,
  BaseItem,
  createAutocomplete,
} from '@algolia/autocomplete-core'
import SearchIcon from '@components/icons/svgSearch'
import { useMemo, useRef, useState } from 'react'
import styles from '../../styles/form.module.css'
import AutocompleteItem from './item'

export default function Search() {
  const [autocompleteState, setAutocompleteState] = useState<
    Pick<AutocompleteState<BaseItem>, 'collections' | 'isOpen'>
  >({
    collections: [],
    isOpen: false,
  })

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Search...',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'search-nfts',
            getItems: ({ query }) => {
              if (query) {
                return fetch(
                  `http://localhost:3000/api/search?q=${query}`,
                ).then((res) => res.json())
              }
              return []
            },
          },
        ],
      }),
    [],
  )

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  })

  return (
    <form className="navbar__searchbar " ref={formRef} {...formProps}>
      <div className={`${autocompleteState.isOpen ? '' : 'hidden'} bg-transparent opacity-90 absolute w-full h-screen top-0 left-0 z-20`}
      onClick={async () => {
        setAutocompleteState({
          collections: [],
          isOpen: false,
        })
        await formRef.current.reset()
      }}
      ></div>
      <div className="flex relative w-full">
        <div className="relative">
          <span className="absolute inset-y-0 lg:left-14 left-[88%] flex items-center text-slate-400">
            <SearchIcon className="w-5 h-5" />
          </span>
          <input
            ref={inputRef}
            className="lg:w-96 h-11 rounded-md lg:ml-10 p-3 lg:pl-11 text-white hover:bg-slate-700 ease duration-150 focus: outline-none focus:bg-slate-700"
            {...inputProps}

            
          />
        </div>
        {autocompleteState.isOpen && (
          <div
            className={`absolute mt-16 lg:ml-5 top-0 left-0 border border-slate-600 bg-slate-700 overflow-auto rounded-lg shadow-lg z-[999] w-full max-h-[28rem] ${styles.scrollbar}`}
            ref={panelRef}
            {...autocomplete.getPanelProps({})}
          >
            {autocompleteState.collections.map(({ items }, index) => {
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item, idx) => (
                        <AutocompleteItem key={`item-${idx}`} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              )
            })}
          </div>
        )}
      </div>
    </form>
  )
}
