import ReviewCard from './ReviewCard';

export default function Reviews({ reviews }) {
return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {reviews.slice(0, 3).map((review, index) => (
        <ReviewCard key={index} {...review} />
    ))}
    </div>
);
}