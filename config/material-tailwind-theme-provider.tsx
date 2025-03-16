"use client";

export { ThemeProvider } from "@material-tailwind/react";
//이렇게 해주는 이유는 기본적으로 layout.tsx는 서버 컴포넌트다.
//하지만 material-tailwind-library같은 경우 클라이언트에서 동작을 해야한다.
//때문에 별도로 클라이언트 컴포넌트로 정의를 해준 이 파일에서 명시적으로  export를 다시 해준 부분이다.
//그럼 layout.tsx에서 이 폴더에서 정의해준 이 ThemeProvider를 import했을 때 클라이언트 컴포넌트로 동작을 하게 된다고 생각하면 된다.
