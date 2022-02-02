# CS732 examples - Encapsulating State
This project contains an example of one way we can cleanly encapsulate stateful values and their mutator functions in a contextual wrapper component, such that those values and functions can be accessed from any descendant component.

Take a look at [AppContextProvider](./src/AppContextProvider.js). This component contains the `articles` stateful value (created with `useState()` on line 23). A context named `AppContext` is created on line 12. The `AppContextProvider` itself simply wraps the provided `children` components in an `AppContext.Provider` component, whose `value` is set to the values & functions we want to expose to descendants.

In this case, we directly expose the `articles` list, but we also expose a function `addArticle`, which itself callse the `setArticles` mutator function. This shows that we don't always have to expose the stateful values / mutators directly.

In [index.js](./src/index.js), we're wrapping the entire `<App>` component in the `<AppContextProvider>` so that the contextual values contained within are accessible from the entire component hierarchy.

Anywhere that `articles` or `addArticle` need to be accessed, we need simply import `AppContext` and get the values we need using the `useContext()` hook. Examples can be seen in [App.js](./src/App.js), [GalleryPage](./src/GalleryPage.js), [ArticleSidebar](./src/ArticleSidebar.js), and [NewArticleForm](./src/NewArticleForm.js).

Compare this code to that shown in [the second React Router example](../example-10-routing-02), which demonstrates a functionally identical app without the use of context. The benefit of the approach in this example is that it avoids a lot of prop and event passing, and cleanly encapsulates the state in its own component, independent of any UI elements. The drawback is that now nearly all components in this app are reliant on `AppContext`, therefore may be less portable to other apps. When considering design decisions such as this, it is important to weigh such benefits and drawbacks, and choose an approach which makes sense for the project at hand.