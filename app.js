// Finansal Hesaplamalar İçin Yardımcı Fonksiyonlar

/**
 * calculateNetIncome - Net gelir hesaplar.
 * @param {number} income - Toplam gelir miktarı.
 * @param {number} expenses - Toplam gider miktarı.
 * @returns {number} Net gelir miktarı.
 */
function calculateNetIncome(income, expenses) {
  return income - expenses;
}

/**
 * calculateSavings - Tasarruf miktarını hesaplar.
 * @param {number} income - Aylık gelir.
 * @param {number} expenses - Aylık giderler.
 * @param {number} debts - Toplam borç miktarı.
 * @returns {number} Tasarruf miktarı.
 */
function calculateSavings(income, expenses, debts) {
  return income - expenses - debts;
}

// Finansal Durumu Güncelleme ve Gösterme

/**
 * updateFinancialSummary - Finansal özeti kullanıcıya gösterir.
 * @param {number} netIncome - Hesaplanan net gelir.
 * @param {number} savings - Hesaplanan tasarruf miktarı.
 */
function updateFinancialSummary(netIncome, savings) {
  document.getElementById("results").innerHTML = `
        <h3>Finansal Özet</h3>
        <p>Net Geliriniz: ${netIncome}</p>
        <p>Tasarruflarınız: ${savings}</p>
    `;
}

function calculateFinances() {
  console.log("kjdnjkdbndjkbndjkbdjkhbdjkdhbjn");
  const { income, expenses } = getMonthlyData();
  drawFinancialCharts(income, expenses);

  // Toplam Gelir ve Gider Hesaplama
  const totalIncome = income.reduce((acc, cur) => acc + cur, 0);
  const totalExpenses = expenses.reduce((acc, cur) => acc + cur, 0);

  // Kar/Zarar Oranı Hesaplama
  // Eğer toplam gelir 0'dan büyükse oranı hesaplayın, aksi halde oranı 0 olarak belirleyin.
  const profitLossRatio =
    totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0;

  // Kar/Zarar Oranını Yüzdelik olarak göstermek için 100 ile çarpın.
  const profitLossPercentage = profitLossRatio * 100;

  // Kar/Zarar Oranını ekranda göster
  const resultElement = document.getElementById("results");
  resultElement.innerHTML += `<p>5 Aylık Toplam Kar/Zarar Oranı: ${profitLossPercentage.toFixed(
    2
  )}%</p>`;
}

// Diğer fonksiyonlar aynı kalacak.

let incomeExpenseChart; // Gelir ve Gider Grafik nesnesini tutar
let savingsChart; // Tasarruf Grafik nesnesini tutar

// Gelir ve gider verilerini formdan alıp dizi olarak döndürür.
function getMonthlyData() {
  const income = [];
  const expenses = [];
  // 5 aylık veri alınıyor; daha fazla veya az ay için bu döngüyü değiştirebilirsiniz.
  for (let i = 1; i <= 5; i++) {
    income.push(
      parseFloat(
        document.getElementById(
          `income${["Jan", "Feb", "Mar", "Apr", "May"][i - 1]}`
        ).value
      ) || 0
    );
    expenses.push(
      parseFloat(
        document.getElementById(
          `expenses${["Jan", "Feb", "Mar", "Apr", "May"][i - 1]}`
        ).value
      ) || 0
    );
  }
  return { income, expenses };
}

// Gelir-gider ve tasarruf miktarları için grafikleri çizer.
function drawFinancialCharts(incomeData, expensesData) {
  const labels = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs"]; // Aylar
  const savingsData = incomeData.map(
    (income, index) => income - expensesData[index]
  ); // Tasarruf hesaplaması

  // Gelir ve Gider Bar Grafiği
  var ctx1 = document.getElementById("incomeExpenseChart").getContext("2d");
  if (incomeExpenseChart) incomeExpenseChart.destroy();
  incomeExpenseChart = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Gelir",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Gider",
          data: expensesData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Tasarruf Çizgi Grafiği
  var ctx2 = document.getElementById("savingsChart").getContext("2d");
  if (savingsChart) savingsChart.destroy();
  savingsChart = new Chart(ctx2, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Tasarruf",
          data: savingsData,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Formdaki kullanıcı girdilerini alarak finansal hesaplamalar yapar ve sonuçları günceller.
function calculateFinances() {
  const { income, expenses } = getMonthlyData();
  drawFinancialCharts(income, expenses);
}

// Form 'submit' olayını dinler ve sayfa yenilenmesini engelleyerek hesaplamaları tetikler.
document.getElementById("financeForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Formun kendi 'submit' olayını engeller
  calculateFinances();
});
