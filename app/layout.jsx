import '@styles/globals.css';
import { Children } from 'react';
export const metaData = {
    title : "PromptAdda" ,
    description : "discover AI prompts"
}
const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient'></div>
            </div>
            <main className='app'>{children}</main>
        </body>
    </html>
  )
}

export default RootLayout