import {createContext, ReactNode, useEffect, useState} from "react"

interface AuthProviderProps {
    children: ReactNode;
}
interface AuthContextProps {
    signed: any;
    user: any;
    signIn: any;
    signUp: any;
    signOut: any;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const userStorage = localStorage.getItem("users_db");

        if(userToken && userStorage){
            const hasUser = JSON.parse(userStorage)?.filter(
                (user: any) => user.email === JSON.parse(userToken).email
            );

            if (hasUser) setUser(hasUser[0])
        }
    }, [])

    const signIn = (email: any, password: any) => {
        const userStorageString = localStorage.getItem("users_db");
        const userStorage = userStorageString ? JSON.parse(userStorageString) : null;

        const hasUser = userStorage ? userStorage.filter((user: any) => user.email === email) : null

        if(hasUser?.length){
            if(hasUser[0].email === email && hasUser[0].password === password){
                localStorage.setItem("user_token", JSON.stringify({email, token: hasUser[0].token}))
                setUser({email, password, token: hasUser[0].token});
                return;
            
            } else{
                return "E-mail ou senha incorretos";
            }
        }else{
            return "Usuário não cadastrado"
        }
    }

    const signUp = (email: any, password: any) => {
        const userStorageString = localStorage.getItem("users_db");
        const usersStorage = userStorageString ? JSON.parse(userStorageString) : null;

        const listTaskDb = localStorage.getItem("list_task_db");
        const listTaskStorage = listTaskDb ? JSON.parse(listTaskDb) : null;
        const hasUser = usersStorage ? usersStorage.filter((user: any) => user.email === email) : null

        if(hasUser?.length){
            return "Já tem uma conta com esse E-mail"
        }

        let newUser;
        let newList;
        let myToken;

        if (usersStorage){
            const token = Math.random().toString(36).substring(2);
            myToken = token; 
            newUser = [...usersStorage, { email, password, token }];
        }else {
            const token = Math.random().toString(36).substring(2);
            myToken = token; 
            newUser = [{email, password, token}];
        }

        if (listTaskStorage){
            newList = [...listTaskStorage, { token: myToken, list_task_db: [] }];
        }else {
            newList = [{ token: myToken, list_task_db: [] }];
        }

        localStorage.setItem("users_db", JSON.stringify(newUser))
        localStorage.setItem("list_task_db", JSON.stringify(newList))

    }

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("user_token")
    }

    return (
        <AuthContext.Provider 
            value={{user, signed: !!user, signIn, signUp, signOut}}
        >
            {children}
        </AuthContext.Provider>
    )
}