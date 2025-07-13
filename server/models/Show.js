import mongoose from 'mongoose';


const ShowSchema = new mongoose.Schema(
    {
        movie: { type: String, required: true },
        showDateTime: { type: Date, required: true },
        showPrice: { type: Number, required: true },
        occuipiedSeats: { type: Object, default: {} },
    }, { minimize: false }
)

const Show = mongoose.model('Show', ShowSchema);

export default Show;

