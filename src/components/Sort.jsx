import { useEffect, useState, useRef } from "react";

export const listSort = [
  {name: 'За рейтингом (спад)',
   sortProperty: 'rating'
  },
  {name: 'За рейтингом (зростаюче)',
   sortProperty: '-rating'
  },
  {name: 'Від дорогих до дешевих',
   sortProperty: 'price'
  },
  {name: 'Від дешевих до дорогих',
   sortProperty: '-price'
  },
  {name: 'алфавіту (спад)',
   sortProperty: 'title'
  },
  {name: 'алфавіту (зростаюче)',
   sortProperty: '-title'
  },
]



export const Sort = ({ value, onSelectedSort }) => {
  const [openSort, setOpenSort] = useState(false)
  const sortRef = useRef()

  useEffect(() => {
    const handleClick = event => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpenSort(false)
      }
    }

    const handleEsc = event => {
      if (event.code === "Escape") {
        setOpenSort(false)
      }
    }

    document.body.addEventListener('click', handleClick)
    document.body.addEventListener('keydown', handleEsc)

    return () => {
      document.body.removeEventListener('click', handleClick)
      document.body.removeEventListener('keydown', handleEsc)
    }
  }, [])
  
  return (
    <div className="sort" ref={sortRef}>
              <div className="sort__label">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                  />
                </svg>
                <b>Сортування за:</b>
                <span onClick={() => setOpenSort(prev => !prev)}>{value.name}</span>
              </div>
             {
             openSort ? <div className="sort__popup">
                <ul>
                  {
                    listSort.map((obj, i) => (
                      <li onClick={() => onSelectedSort(obj, setOpenSort(prev => !prev))} className={value.name === obj.name ? 'active' : ''} key={i}>
                        {obj.name}
                      </li>
                    ))
                  }
                </ul>
              </div> : null
              }
            </div>
  );
}