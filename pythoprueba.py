import json
import pandas as pd

# Load the data from the uploaded XLSX file
file_path = "tesis14\Prueba_2_actualizada_final.xlsx"
data = pd.read_excel(file_path)

# Update salary data
salary_updates = [
    "$900,000 - $1,500,000 ARS mensuales (promedio inicial), >$1,800,000 ARS (con experiencia)",
    "$720,000 - $1,200,000 ARS mensuales (promedio inicial), >$1,500,000 ARS (con experiencia)",
    "$900,000 - $1,500,000 ARS mensuales (promedio inicial), >$1,800,000 ARS (con experiencia)",
    "$1,080,000 - $1,800,000 ARS mensuales (promedio inicial), >$2,400,000 ARS (con experiencia)",
    "$1,080,000 - $1,800,000 ARS mensuales (promedio inicial), >$2,400,000 ARS (con experiencia)",
    "$720,000 - $1,200,000 ARS mensuales (promedio inicial), >$1,500,000 ARS (con experiencia)",
    "$600,000 - $1,080,000 ARS mensuales (promedio inicial), >$1,200,000 ARS (con experiencia)",
    "$1,200,000 - $2,100,000 ARS mensuales (promedio inicial), >$2,700,000 ARS (con experiencia)",
    "$900,000 - $1,500,000 ARS mensuales (promedio inicial), >$1,800,000 ARS (con experiencia)",
    "$720,000 - $1,200,000 ARS mensuales (promedio inicial), >$1,500,000 ARS (con experiencia)",
    "$720,000 - $1,200,000 ARS mensuales (promedio inicial), >$1,500,000 ARS (con experiencia)",
    "$600,000 - $1,080,000 ARS mensuales (promedio inicial), >$1,200,000 ARS (con experiencia)",
    "$1,080,000 - $1,800,000 ARS mensuales (promedio inicial), >$2,400,000 ARS (con experiencia)",
    "$1,080,000 - $1,800,000 ARS mensuales (promedio inicial), >$2,400,000 ARS (con experiencia)",
    "$1,200,000 - $2,100,000 ARS mensuales (promedio inicial), >$2,700,000 ARS (con experiencia)",
    "$1,080,000 - $1,800,000 ARS mensuales (promedio inicial), >$2,400,000 ARS (con experiencia)"
]

data['sueldo promedio'] = salary_updates

# Define characteristics and skills for each career
career_characteristics = {
    "Licenciado en Ciencia Política": "Interés en el análisis político, habilidades de investigación, capacidad de análisis crítico y comprensión de políticas públicas.",
    "Licenciado en Comunicación": "Habilidades de comunicación escrita y verbal, creatividad, capacidad de trabajar bajo presión y habilidades de investigación.",
    "Licenciado en Relaciones Internacionales": "Interés en asuntos internacionales, habilidades de análisis, conocimiento de idiomas y habilidades de negociación.",
    "Abogado": "Habilidades de argumentación, pensamiento crítico, habilidades de investigación y capacidad para trabajar bajo presión.",
    "Licenciado en Economía": "Habilidades matemáticas y analíticas, capacidad de resolver problemas, interés en la economía global y habilidades de investigación.",
    "Licenciado en Administración de Empresas": "Habilidades de liderazgo, capacidad para trabajar en equipo, habilidades organizativas y pensamiento estratégico.",
    "Licenciado en Negocios Digitales": "Interés en la tecnología, habilidades de gestión de proyectos, creatividad y capacidad de innovación.",
    "Licenciado en Ciencias del Comportamiento": "Interés en comprender el comportamiento humano, habilidades de análisis, capacidad de comunicación y empatía."
}

# Function to generate JSONL content with multiple prompts for each program
def generate_jsonl_multiple_prompts(data):
    prompts = []
    templates = [
        {"role": "user", "content": "Estoy interesado en estudiar {title}. ¿Qué puedes decirme sobre este programa en la Universidad de San Andrés?"},
        {"role": "user", "content": "¿Qué oportunidades laborales están disponibles para los graduados del programa de {title} en la Universidad de San Andrés?"},
        {"role": "user", "content": "¿Cuánto dura el programa de {title} en la Universidad de San Andrés?"},
        {"role": "user", "content": "¿Cuál es el salario promedio para alguien con un título en {title} de la Universidad de San Andrés?"},
        {"role": "user", "content": "¿Qué habilidades y características son importantes para tener éxito en el programa de {title} en la Universidad de San Andrés?"}
    ]

    hobby_skill_templates = [
        {"role": "user", "content": "Soy capitán de un equipo deportivo. ¿Qué carrera me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gusta mucho debatir y convencer a la gente. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Disfruto mucho de trabajar en equipo y liderar proyectos. ¿Qué programas ofrece la Universidad de San Andrés que se ajusten a estas habilidades?"},
        {"role": "user", "content": "Tengo habilidades analíticas y me gusta resolver problemas. ¿Qué programas me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gustan las cosas creativas y la tecnología. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me interesa comprender el comportamiento humano y las ventas. ¿Qué carrera debería considerar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gusta jugar videojuegos y crear software. ¿Qué carrera me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Tengo interés en las finanzas y la bolsa de valores. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Soy bueno en resolver problemas complejos y me gusta la lógica. ¿Qué programa me recomendarías?"},
        {"role": "user", "content": "Disfruto escribir y contar historias. ¿Qué carrera me recomendarías?"},
        {"role": "user", "content": "Me encanta aprender sobre el comportamiento humano y la psicología. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Tengo habilidades de liderazgo y me gusta organizar eventos. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me interesa el medio ambiente y la sostenibilidad. ¿Qué carrera me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Disfruto trabajar con datos y estadísticas. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gusta el diseño gráfico y la creación de contenido visual. ¿Qué programa me recomendarías?"},
        {"role": "user", "content": "Soy bueno en matemáticas y disfruto de la programación. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Tengo interés en la historia y las ciencias sociales. ¿Qué carrera me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gusta viajar y conocer diferentes culturas. ¿Qué programa de estudios me recomendarías?"},
        {"role": "user", "content": "Tengo habilidades para la investigación y disfruto aprender nuevas cosas. ¿Qué carrera debería considerar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me interesa la medicina y la biología. ¿Qué programa me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Disfruto de la música y la producción de audio. ¿Qué carrera me recomendarías?"},
        {"role": "user", "content": "Tengo habilidades en marketing y me gusta la publicidad. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gusta trabajar en proyectos innovadores y emprender. ¿Qué carrera me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Disfruto de la física y la química. ¿Qué programa de estudios debería considerar?"},
        {"role": "user", "content": "Tengo interés en las artes visuales y la fotografía. ¿Qué carrera me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gusta ayudar a las personas y tengo un interés en el trabajo social. ¿Qué programa me recomendarías?"},
        {"role": "user", "content": "Tengo habilidades en gestión de proyectos y disfruto trabajar en equipo. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me interesa la tecnología y la innovación. ¿Qué carrera me recomendarías?"},
        {"role": "user", "content": "Disfruto de las ciencias políticas y las relaciones internacionales. ¿Qué programa me recomendarías en la Universidad de San Andrés?"},
        {"role": "user", "content": "Me gusta la robótica y la inteligencia artificial. ¿Qué debería estudiar en la Universidad de San Andrés?"},
        {"role": "user", "content": "Tengo interés en la educación y la pedagogía. ¿Qué carrera me recomendarías en la Universidad de San Andrés?"}
    ]

    for index, row in data.iterrows():
        # Create prompts based on the main templates
        for template in templates:
            prompt = {
                "messages": [
                    {"role": "system", "content": "Eres un asistente útil especializado en proporcionar asesoramiento sobre carreras basado en intereses personales, habilidades y datos disponibles de la Universidad de San Andrés."},
                    {"role": "user", "content": template["content"].format(title=row['Título'])},
                    {"role": "assistant", "content": generate_response(row, template["content"]), "weight": 1}
                ]
            }
            prompts.append(json.dumps(prompt))
        
        # Create specific prompts for hobbies and skills
        for template in hobby_skill_templates:
            prompt = {
                "messages": [
                    {"role": "system", "content": "Eres un asistente útil especializado en proporcionar asesoramiento sobre carreras basado en intereses personales, habilidades y datos disponibles de la Universidad de San Andrés."},
                    {"role": "user", "content": template["content"]},
                    {"role": "assistant", "content": generate_hobby_skill_response(template["content"], row), "weight": 1}
                ]
            }
            prompts.append(json.dumps(prompt))

    # Add bad prompts
    bad_prompts = [
        {
            "messages": [
                {"role": "system", "content": "Eres un asistente útil especializado en proporcionar asesoramiento sobre carreras basado en intereses personales, habilidades y datos disponibles de la Universidad de San Andrés."},
                {"role": "user", "content": "¿Cuál es tu comida favorita?"},
                {"role": "assistant", "content": "No tengo una comida favorita, soy un asistente virtual.", "weight": 0}
            ]
        },
        {
            "messages": [
                {"role": "system", "content": "Eres un asistente útil especializado en proporcionar asesoramiento sobre carreras basado en intereses personales, habilidades y datos disponibles de la Universidad de San Andrés."},
                {"role": "user", "content": "¿Qué piensas sobre la política actual?"},
                {"role": "assistant", "content": "No tengo opiniones personales, soy un asistente virtual.", "weight": 0}
            ]
        },
        {
            "messages": [
                {"role": "system", "content": "Eres un asistente útil especializado en proporcionar asesoramiento sobre carreras basado en intereses personales, habilidades y datos disponibles de la Universidad de San Andrés."},
                {"role": "user", "content": "¿Qué opinas sobre el clima?"},
                {"role": "assistant", "content": "No tengo opiniones sobre el clima, soy un asistente virtual.", "weight": 0}
            ]
        }
    ]
    
    for bad_prompt in bad_prompts:
        prompts.append(json.dumps(bad_prompt))
    
    return prompts

def generate_response(row, template):
    if "oportunidades laborales" in template:
        return f"Los graduados del programa de {row['Título']} en la Universidad de San Andrés pueden encontrar oportunidades laborales en {row['salida laboral']}. El rango salarial promedio es de {calculate_salary(row['sueldo promedio'])}."
    elif "dura" in template:
        return f"El programa de {row['Título']} en la Universidad de San Andrés tiene una duración de {row['Duración']}. Puedes contactarlos al {row['Teléfono']} para más detalles."
    elif "salario promedio" in template:
        return f"Los graduados del programa de {row['Título']} en la Universidad de San Andrés pueden esperar un rango salarial promedio de {calculate_salary(row['sueldo promedio'])}."
    elif "habilidades y características" in template:
        characteristics = career_characteristics.get(row['Título'], "Características generales")
        return f"Para tener éxito en el programa de {row['Título']} en la Universidad de San Andrés, es importante tener las siguientes habilidades y características: {characteristics}."
    else:
        return f"La Universidad de San Andrés ofrece un título en {row['Título']}. Es un programa de {row['Duración']}. El número de contacto es {row['Teléfono']}. Para más detalles, puedes visitar {row['Web']} o enviar un correo a {row['Mail']}. Los graduados pueden encontrar oportunidades laborales en {row['salida laboral']}, con un rango salarial promedio de {calculate_salary(row['sueldo promedio'])}."

def generate_hobby_skill_response(user_input, row):
    if "capitán de un equipo deportivo" in user_input:
        return f"Como capitán de un equipo deportivo, tienes habilidades de liderazgo y trabajo en equipo. Te recomendaría considerar el programa de Administración de Empresas en la Universidad de San Andrés. Este programa te preparará para roles de liderazgo y gestión en el mundo empresarial."
    elif "debatir y convencer a la gente" in user_input:
        return f"Si te gusta debatir y convencer a la gente, te recomendaría estudiar Comunicación en la Universidad de San Andrés. Este programa te ayudará a desarrollar tus habilidades de comunicación y persuasión."
    elif "trabajar en equipo y liderar proyectos" in user_input:
        return f"Disfrutar de trabajar en equipo y liderar proyectos son habilidades valiosas. Te recomendaría el programa de Administración de Empresas en la Universidad de San Andrés, que te preparará para roles de liderazgo y gestión."
    elif "habilidades analíticas y resolver problemas" in user_input:
        return f"Tener habilidades analíticas y disfrutar de resolver problemas son cualidades importantes. Te recomendaría estudiar Economía en la Universidad de San Andrés, que te ayudará a desarrollar estas habilidades."
    elif "cosas creativas y la tecnología" in user_input:
        return f"Si te gustan las cosas creativas y la tecnología, te recomendaría estudiar Negocios Digitales en la Universidad de San Andrés. Este programa te ayudará a combinar creatividad y tecnología en el mundo empresarial."
    elif "comprender el comportamiento humano y las ventas" in user_input:
        return f"Si te interesa comprender el comportamiento humano y las ventas, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés. Este programa te ayudará a entender cómo piensan y se comportan las personas, lo cual es útil para las ventas y marketing."
    elif "jugar videojuegos y crear software" in user_input:
        return f"Si te gusta jugar videojuegos y crear software, te recomendaría estudiar Negocios Digitales en la Universidad de San Andrés. Este programa te ayudará a combinar tu pasión por la tecnología con habilidades de gestión empresarial."
    elif "finanzas y la bolsa de valores" in user_input:
        return f"Si tienes interés en las finanzas y la bolsa de valores, te recomendaría estudiar Economía en la Universidad de San Andrés. Este programa te preparará para una carrera en el mundo financiero."
    elif "resolver problemas complejos y la lógica" in user_input:
        return f"Si eres bueno en resolver problemas complejos y te gusta la lógica, te recomendaría estudiar Economía en la Universidad de San Andrés, que te ayudará a desarrollar estas habilidades."
    elif "escribir y contar historias" in user_input:
        return f"Si disfrutas escribir y contar historias, te recomendaría estudiar Comunicación en la Universidad de San Andrés. Este programa te permitirá desarrollar tus habilidades narrativas y de comunicación."
    elif "comportamiento humano y la psicología" in user_input:
        return f"Si te encanta aprender sobre el comportamiento humano y la psicología, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés."
    elif "liderazgo y organizar eventos" in user_input:
        return f"Si tienes habilidades de liderazgo y te gusta organizar eventos, te recomendaría estudiar Administración de Empresas en la Universidad de San Andrés."
    elif "medio ambiente y la sostenibilidad" in user_input:
        return f"Si te interesa el medio ambiente y la sostenibilidad, te recomendaría estudiar Relaciones Internacionales en la Universidad de San Andrés, con un enfoque en políticas ambientales."
    elif "trabajar con datos y estadísticas" in user_input:
        return f"Si disfrutas trabajar con datos y estadísticas, te recomendaría estudiar Economía en la Universidad de San Andrés."
    elif "diseño gráfico y la creación de contenido visual" in user_input:
        return f"Si te gusta el diseño gráfico y la creación de contenido visual, te recomendaría estudiar Diseño en la Universidad de San Andrés."
    elif "matemáticas y la programación" in user_input:
        return f"Si eres bueno en matemáticas y disfrutas de la programación, te recomendaría estudiar Negocios Digitales en la Universidad de San Andrés."
    elif "historia y las ciencias sociales" in user_input:
        return f"Si tienes interés en la historia y las ciencias sociales, te recomendaría estudiar Ciencia Política en la Universidad de San Andrés."
    elif "viajar y conocer diferentes culturas" in user_input:
        return f"Si te gusta viajar y conocer diferentes culturas, te recomendaría estudiar Relaciones Internacionales en la Universidad de San Andrés."
    elif "habilidades para la investigación y aprender nuevas cosas" in user_input:
        return f"Si tienes habilidades para la investigación y disfrutas aprender nuevas cosas, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés."
    elif "medicina y la biología" in user_input:
        return f"Si te interesa la medicina y la biología, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés."
    elif "música y la producción de audio" in user_input:
        return f"Si disfrutas de la música y la producción de audio, te recomendaría estudiar diseño en la Universidad de San Andrés."
    elif "marketing y la publicidad" in user_input:
        return f"Si tienes habilidades en marketing y te gusta la publicidad, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés."
    elif "proyectos innovadores y emprender" in user_input:
        return f"Si te gusta trabajar en proyectos innovadores y emprender, te recomendaría estudiar Administración de Empresas en la Universidad de San Andrés."
    elif "física y la química" in user_input:
        return f"Si disfrutas de la física y la química, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés, que te dará una base sólida en ciencias y análisis."
    elif "artes visuales y la fotografía" in user_input:
        return f"Si tienes interés en las artes visuales y la fotografía, te recomendaría estudiar Diseño en la Universidad de San Andrés."
    elif "ayudar a las personas y el trabajo social" in user_input:
        return f"Si te gusta ayudar a las personas y tienes un interés en el trabajo social, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés."
    elif "gestión de proyectos y trabajar en equipo" in user_input:
        return f"Si tienes habilidades en gestión de proyectos y disfrutas trabajar en equipo, te recomendaría estudiar Administración de Empresas en la Universidad de San Andrés."
    elif "tecnología y la innovación" in user_input:
        return f"Si te interesa la tecnología y la innovación, te recomendaría estudiar Negocios Digitales o Ingenieria en Inteligencia Artificial en la Universidad de San Andrés."
    elif "ciencias políticas y las relaciones internacionales" in user_input:
        return f"Si disfrutas de las ciencias políticas y las relaciones internacionales, te recomendaría estudiar Relaciones Internacionales en la Universidad de San Andrés."
    elif "robótica y la inteligencia artificial" in user_input:
        return f"Si te gusta la robótica y la inteligencia artificial, te recomendaría estudiar Ingenieria en Inteligencia Artificial en la Universidad de San Andrés."
    elif "educación y la pedagogía" in user_input:
        return f"Si tienes interés en la educación y la pedagogía, te recomendaría estudiar Ciencias del Comportamiento en la Universidad de San Andrés."
    else:
        return ""

def calculate_salary(salary_range):
    try:
        # Extract min and max salary, handle various formats
        salary_range = salary_range.replace("ARS mensuales", "").replace("(", "").replace(")", "").replace("$", "").replace(" ", "")
        min_salary, max_salary = salary_range.split("-")
        min_salary = int(min_salary.replace(",", "")) * 6
        max_salary = int(max_salary.replace(",", "")) * 6
        return f"${min_salary:,} - ${max_salary:,} ARS mensuales"
    except ValueError:
        # Handle cases where salary format is inconsistent
        return "Información salarial no disponible"

# Generate JSONL content with multiple prompts
jsonl_prompts_multiple = generate_jsonl_multiple_prompts(data)

# Save to a JSONL file
output_file_path_multiple = 'tesis14/TrainData1.jsonl'
with open(output_file_path_multiple, 'w') as file:
    for prompt in jsonl_prompts_multiple:
        file.write(prompt + '\n')

output_file_path_multiple