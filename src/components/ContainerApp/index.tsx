import { NavBar } from '../NavBar';

export function ContainerApp({children}: any) {
  return (
    <NavBar>
        {children}
    </NavBar>
  );
}