import React, {createContext, useState} from 'react';

const MyContext = createContext({
  isOpenHelper: false,
  setIsOpenHelper: () => {},
});

export const AppProvider = props => {
  const [isOpenHelper, setIsOpenHelper] = useState(false);
  return (
    <MyContext.Provider value={{isOpenHelper, setIsOpenHelper}}>
      {props.children}
    </MyContext.Provider>
  );
};
export const WithState = C => {
  return props => {
    return (
      <AppProvider>
        <C {...props} />
      </AppProvider>
    );
  };
};
export default MyContext;
