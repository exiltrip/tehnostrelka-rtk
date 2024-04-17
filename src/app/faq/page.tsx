import FaqItem from '../ui/faqItem/faqItem';
import {faqs} from "@/app/lib/faqs";

const Page: React.FC = () => {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold text-center mb-5">Часто задаваемые вопросы</h1>
            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </div>
    );
};

export default Page;
