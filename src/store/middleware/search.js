
const ignoreSpace = (store) => (next) => (action) => {
    if (action.type === 'search/toggleSearch') {
        action.payload = action.payload.replaceAll(' ', '')
    }
    next(action)
}

// const lowerRegitsr = () => (next) => (action) => {
//     if (action.type === 'search/toggleSearch') {
//         action.payload = action.payload.toLowerCase()
//     }
//     next(action)
// }


export default function searchMiddlewares(){
    return [
        // ignoreSpace
    ]
} 