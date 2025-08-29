export const CropResult = ({ prediction }) => {
    return <>
        <p>
            The best plant to plant is
        </p>
        <p className="crop-predicted">
            {prediction}
        </p>
    </>
}