"use client"
import { useState } from 'react';

type FaqItemProps = {
    question: string;
    answer: string;
};

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <h2 className="text-lg font-semibold cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {question}
            </h2>
            {isOpen && (
                <p className="mt-2 text-gray-600">
                    {answer}
                </p>
            )}
        </div>
    );
};

export default FaqItem;
