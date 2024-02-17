

export const MultimediaEvent = ({ event }) => {

    const { title, user } = event;

    return (
        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </>
    )
}