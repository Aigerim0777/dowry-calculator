document.getElementById("submit").addEventListener("click", calculateDowry);

function calculateDowry() {
    let basePrice = 100;

    const educationCoeff = {
        "undergraduate": 1.5,
        "college": 1.2,
        "high_school": 1.05,
        "middle_school": 0.9
    };
    basePrice *= educationCoeff[document.getElementById("education").value] || 1;

    const networthCoeff = {
        "upper_class": 2,
        "middle_class": 1.5,
        "lower_class": 1.2
    };
    basePrice *= networthCoeff[document.getElementById("networth").value] || 1;

    const casteBonus = {
        "brahmin": 100,
        "kshatriya": 50,
        "vaishya": 20,
        "shudra": 10,
        "untouchable": -50
    };
    basePrice += casteBonus[document.getElementById("caste").value] || 0;

    const skillBonus = {
        "instrument": 10,
        "cook": 20,
        "easygoing": 15,
        "singing": 10
    };
    document.querySelectorAll('input[name="skills"]:checked').forEach(skill => {
        basePrice += skillBonus[skill.value] || 0;
    });

    const ageCoeff = {
        "18_23": 1.5,
        "24_27": 1.2,
        "28plus": 0.95
    };
    const age = document.querySelector('input[name="age"]:checked');
    basePrice *= age ? ageCoeff[age.value] : 1;

    let repCoeff = 1;
    let repPenalty = 0;
    document.querySelectorAll('input[name="reputation"]:checked').forEach(rep => {
        if (rep.value === "parents") repCoeff *= 0.85;
        if (rep.value === "character") repCoeff *= 0.9;
        if (rep.value === "general") repPenalty += 20;
    });
    basePrice = Math.max(0, basePrice * repCoeff - repPenalty);

    const modalResult = document.getElementById("modalResult");
    modalResult.innerHTML = `$${basePrice.toFixed(2)}`;
    modalResult.className = "";
    modalResult.classList.add(basePrice > 500 ? "text-success" : "text-danger", "h4");
    
    $('#resultModal').modal('show');
}
