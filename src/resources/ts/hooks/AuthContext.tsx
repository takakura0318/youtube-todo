import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
    VFC,
} from "react";

// コンテキストの型を定義
type AuthCotextProps = {
    isAuthFlag: boolean;
    setIsAuthFlag: Dispatch<SetStateAction<boolean>>;
};

// コンテキストを使う為の前準備
const AuthContext = createContext<AuthCotextProps>({
    // 初期値を設定
    isAuthFlag: false,
    setIsAuthFlag: () => {},
});

export const AuthProvider = (proos: { children: ReactNode }) => {
    const { children } = proos;
    // 認証状態を保持するState
    const [isAuthFlag, setIsAuthFlag] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthFlag, setIsAuthFlag }}>
            {children}
        </AuthContext.Provider>
    );
};

// これは別ファイルに分けてもいいかも
export const useAuth = () => useContext(AuthContext);
