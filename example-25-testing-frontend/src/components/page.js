import { Sidebar, Main } from './dummy';

export default function Page() {
    return (
        <div>
            <h1>This is my page!</h1>
            <div className="grid">
                <Sidebar buttons={['Menu 1', 'Menu 2']} />

                <Main>
                    <h3>Subtitle</h3>
                    <p>Some text</p>
                </Main>
            </div>
        </div>
    );
}