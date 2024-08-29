export default function Contact(){
    return(
        <div className="container flex flex-col items-center justify-center mt-8">
            <form className="flex flex-col w-4/12 p-8 space-y-5 bg-gray-700 rounded" action="#">
                <label className="text-white" htmlFor="subject">Select a Subject:</label>
                <select className="py-2 rounded" id="subject" name="subject">
                    <option value="order_inquiry">Order Inquiry</option>
                    <option value="product_question">Product Question</option>
                    <option value="technical_support">Technical Support</option>
                    <option value="donation_inquiry">Donation Inquiry</option>
                    <option value="general_feedback">General Feedback</option>
                    <option value="other">Other</option>
                </select>
                <label htmlFor="emailBody" className="text-white">Write your body here:</label>
                <textarea name="emailBody" id="emailBody" cols="30" rows="10" placeholder="Enter your message here." className="p-2"></textarea>
                <input className="w-24 py-2 text-white bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer" type="submit" value="Send"/>
            </form>
        </div>
    );
}