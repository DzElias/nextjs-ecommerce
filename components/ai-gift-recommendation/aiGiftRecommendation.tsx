import TextInput from "./TextInput";
import TitleSection from "./TitleSection";

export default function AiGiftRecommendation() {
    return (
        <section className="max-w-3xl mx-auto py-10 text-center">
            <TitleSection />
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                {/* Sección de texto y formulario */}
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-purple-800 ">¿No sabes qué regalar?</h2>
                    <p className="text-gray-600 py-5">
                    Conta más: ¿Para quién es el regalo? ¿Qué edad tiene? ¿Cuánto querés gastar?
                    </p>
                    <TextInput />
                </div>

                {/* Sección del asistente con imagen más grande y botón abajo */}
                <div className="flex flex-col items-center ml-4">
                    <img
                        src="/image/image.png"
                        alt="Asistente virtual"
                        className="w-40 h-auto object-contain"
                    />
                    <button className="mt-3 text-purple-600 font-medium hover:underline">
                        ¿Cómo funciona?
                    </button>
                </div>

            </div>
        </section>
    );
}
