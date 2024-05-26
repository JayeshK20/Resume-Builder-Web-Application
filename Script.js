// Define variables for different sections and tabs
const tabs = document.querySelectorAll('.tab');
const inputSections = document.querySelectorAll('.input-section');
const generateResumeButton1 = document.getElementById('generate-resume1');
const generateResumeButton2 = document.getElementById('generate-resume2');
const generateResumeButton3 = document.getElementById('generate-resume3');
const previewContent1 = document.getElementById('preview-content1');
const previewContent2 = document.getElementById('preview-content2');
const previewContent3 = document.getElementById('preview-content3');

// Initialize the application
initializeApp();

function initializeApp() {
  
  // Set event listeners for tab clicks
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showSection(index));
  });

  // Set the default tab to show on page load
  showSection(0);

  // Set event listener for generating the resume
  generateResumeButton1.addEventListener('click', generateResume);
  generateResumeButton2.addEventListener('click', generateResume2);
  generateResumeButton3.addEventListener('click', generateResume3);

  //Hide buttons at the start 
  generateResumeButton1.style.visibility="hidden";
  generateResumeButton2.style.visibility="hidden";
  generateResumeButton3.style.visibility="hidden";

  // Add event listener for profile image input change
  const profileImgInput = document.getElementById('profile-img');
  const profileImgPreview = document.getElementById('profile-img-preview');

  profileImgInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const previewImage = document.getElementById('preview-image');
        previewImage.src = e.target.result;
        profileImgPreview.style.display = 'block'; // Show the image preview container
      };
      reader.readAsDataURL(file);
    } else {
      profileImgPreview.style.display = 'none'; // Hide the image preview container if no image is selected
    }
  });
}

function showSection(index) {
  
  // Hide all sections and tabs
  inputSections.forEach(section => {
    section.style.display = 'none';
  });
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // Show the selected section and highlight the corresponding tab
  inputSections[index].style.display = 'block';
  tabs[index].classList.add('active');
}

//scroll template 

  function scrollToSection(sectionId) {
    var sectionScroll = document.getElementById(sectionId);
    if (section) {
      sectionScroll.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function showPreviewSmoothly(preview) {
    // Remove 'active' class from all previews
    document.querySelectorAll('.preview-content').forEach(preview => {
      preview.classList.remove('active');
    });
  
    // Add 'active' class to the selected preview after a short delay for a smooth transition
    setTimeout(() => {
      preview.classList.add('active');
    }, 100);
  }

var container = document.getElementById("container");
var section = document.getElementById("resume-preview");
var section2 = document.getElementById("resume-preview2");
var section3 = document.getElementById("resume-preview3");

  function showcontainer(){
    container.style.display="block";
    container.style.visibility="visible";
  }

  function showSection1(){
    generateResumeButton1.style.visibility="visible";
    section.style.display="block";
    section2.style.display="none";
    section3.style.display="none";
    showPreviewSmoothly(previewContent1);
    scrollToSection('container');
  }
  
  function showSection2(){
    generateResumeButton2.style.visibility="visible";
    section.style.display="none";
    section2.style.display="block";
    section3.style.display="none";
    showPreviewSmoothly(previewContent2);
    scrollToSection('container');
  }
  
  function showSection3(){
    generateResumeButton3.style.visibility="visible";
    section.style.display="none";
    section2.style.display="none";
    section3.style.display="block";
    showPreviewSmoothly(previewContent3);
    scrollToSection('container');
  }

// Function to generate and download PDF
function downloadResumeAsPDF() {
  const activeResume = document.querySelector('.preview-content.active'); // Select the active resume content

  if (activeResume) {
    const resumeElement = activeResume.querySelector('.resume') || activeResume.querySelector('.resume2') || activeResume.querySelector('.resume3');
    if (resumeElement) {
      // Set options for PDF generation
      const pdfOptions = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          fontSize: 4,
        },
      };

      // Generate and save PDF from the active resume content
      html2pdf().from(resumeElement).set(pdfOptions).save();
    }
  }
}


// Add event listener to the download resume button
const downloadResumeButton = document.getElementById('download-resume');
downloadResumeButton.addEventListener('click', downloadResumeAsPDF);


function generateResume() {
  // Gather input values from various sections
  const personalInfoSection = inputSections[0];
  const educationSection = inputSections[1];
  const experienceSection = inputSections[2];

  const profileImgElement = document.getElementById('preview-image');
  const profileImgBase64 = profileImgElement.src;
  const fullName = personalInfoSection.querySelector('#full-name').value;
  const dateOfBirth = personalInfoSection.querySelector('#date-of-birth').value;
  const nationality = personalInfoSection.querySelector('#nationality').value;
  const jobTitle = personalInfoSection.querySelector('#job-title').value;
  const address = personalInfoSection.querySelector('#address').value || '';
  const phone = personalInfoSection.querySelector('#phone').value;
  const email = personalInfoSection.querySelector('#email').value;
  const linkedin = personalInfoSection.querySelector('#linkedin').value;
  const summary = personalInfoSection.querySelector('#summary').value;

  const school = educationSection.querySelector('#school').value;
  const degree = educationSection.querySelector('#degree').value;
  const graduationYear = educationSection.querySelector('#graduation-year').value;
  const gpa = educationSection.querySelector('#gpa').value;
  const major = educationSection.querySelector('#major').value;
  const honors = educationSection.querySelector('#honors').value;
  const courses = educationSection.querySelector('#courses').value;

  const jobTitleExp = experienceSection.querySelector('#job-title-experience').value;
  const employer = experienceSection.querySelector('#employer').value;
  const workPeriod = experienceSection.querySelector('#work-period').value;
  const jobDescription = experienceSection.querySelector('#job-description').value;
  const achievements = experienceSection.querySelector('#achievements').value;
  const references = experienceSection.querySelector('#references').value;
  const certifications = experienceSection.querySelector('#certifications').value;
  const keywords = experienceSection.querySelector('#keywords').value;
  
  
  // Create the resume content
  
  const resumeContent1 = `
  <div class="resume">
    <div class="resume-header"> 
    <img src="${profileImgBase64}" alt="Profile Image" class="img_display">
      <div class="header_text">${fullName}</div>
      <p class="jobRole">${jobTitle}</p>
    </div>
    <div class="resume-section">
      <h2>Personal Information</h2>
      <div class="content">
        <ul class="info-list">
          <li><strong>Date of Birth:</strong> ${dateOfBirth}</li>
          <li><strong>Nationality:</strong> ${nationality}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>LinkedIn:</strong> ${linkedin}</li>
        </ul>
      </div>
    </div>

    <div class="resume-section">
      <h2>Summary</h2>
      <div class="content">
        <p class="summary">${summary}</p>
      </div>
    </div>

    <div class="resume-section">
      <h2>Education</h2>
      <div class="content">
        <ul class="education-list">
          <li><strong>${degree}</strong>, ${school}</li>
          <li><strong>Graduated:</strong> ${graduationYear}</li>
          <li><strong>GPA:</strong> ${gpa}</li>
          <li><strong>Major:</strong> ${major}</li>
          <li><strong>Honors/Awards:</strong> ${honors}</li>
          <li><strong>Relevant Courses:</strong> ${courses}</li>
        </ul>
      </div>
    </div>

    <div class="resume-section">
      <h2>Work Experience</h2>
      <div class="content">
        <ul class="experience-list">
          <li><strong>${jobTitleExp}</strong>, ${employer}</li>
          <li><strong>${workPeriod}</strong></li>
          <li><strong>Job Description:</strong> ${jobDescription}</li>
          <li class="keywords-section">
            <h3>Keywords</h3>
            <div class="keyword">
              ${keywords
                .split(',')
                .map(
                  keyword =>
                    `<span class="keyword-tag">${keyword.trim()}</span>`
                )
                .join(' ')}
            </div>
          </li>
          <li><strong>Achievements:</strong> ${achievements}</li>
          <li><strong>References:</strong> ${references}</li>
          <li><strong>Certifications:</strong> ${certifications}</li>
        </ul>
      </div>
    </div>
    <!-- Add more resume sections here -->
  </div>
`;

  // Display the generated resume content in the preview section
  previewContent1.innerHTML = resumeContent1;
}

function generateResume2() {
  // Gather input values from various sections
  const personalInfoSection = inputSections[0];
  const educationSection = inputSections[1];
  const experienceSection = inputSections[2];

  const profileImgElement = document.getElementById('preview-image');
  const profileImgBase64 = profileImgElement.src;
  const fullName = personalInfoSection.querySelector('#full-name').value;
  const dateOfBirth = personalInfoSection.querySelector('#date-of-birth').value;
  const nationality = personalInfoSection.querySelector('#nationality').value;
  const jobTitle = personalInfoSection.querySelector('#job-title').value;
  const address = personalInfoSection.querySelector('#address').value || '';
  const phone = personalInfoSection.querySelector('#phone').value;
  const email = personalInfoSection.querySelector('#email').value;
  const linkedin = personalInfoSection.querySelector('#linkedin').value;
  const summary = personalInfoSection.querySelector('#summary').value;

  const school = educationSection.querySelector('#school').value;
  const degree = educationSection.querySelector('#degree').value;
  const graduationYear = educationSection.querySelector('#graduation-year').value;
  const gpa = educationSection.querySelector('#gpa').value;
  const major = educationSection.querySelector('#major').value;
  const honors = educationSection.querySelector('#honors').value;
  const courses = educationSection.querySelector('#courses').value;

  const jobTitleExp = experienceSection.querySelector('#job-title-experience').value;
  const employer = experienceSection.querySelector('#employer').value;
  const workPeriod = experienceSection.querySelector('#work-period').value;
  const jobDescription = experienceSection.querySelector('#job-description').value;
  const achievements = experienceSection.querySelector('#achievements').value;
  const references = experienceSection.querySelector('#references').value;
  const certifications = experienceSection.querySelector('#certifications').value;
  const keywords = experienceSection.querySelector('#keywords').value;
  
  
  // Create the resume content
  
  const resumeContent2 = `
  <div class="resume2">
  <div id="wrapper">
  <div class="resumme">
      <div class="left-section">
       <div class="upper-left">
        <div class="logo"><img src="Images/logo-timscdr.png"></div>
        <div style="height: 60px;"></div>
        <div class="profile">
        
        <img src="${profileImgBase64}" alt="Profile Image" class="img_display2">

        </div>
       </div>
        
       <div class="lower-left">
        <div class="about">About Me</div>

        <hr class="aboutLine">

        <div class="aboutInfo">
          <div>Date of Birth : ${dateOfBirth}</div> 
          <div>Age : 23 </div>
          <div>Gender : Male </div>
          <div>Birth Place : ${nationality}</div>
        </div>

        <div class="Contact">CONTACT</div>
        <hr class="aboutLine2">
        <div class="location">
          <i class="fa-solid fa-location-dot" style="color: white; font-size: 27px;"></i>
          <div style="color: whitesmoke; font-size: medium;">${address}
          </div>

        </div>
        <div class="tele">
          <i class="fa-solid fa-phone-volume" style="color: lightgreen; font-size: 22px;"></i>
           <p style="color: whitesmoke; font-size: medium;">${phone}</p>
        </div>

        <div class="mail">
          <i class="fa-solid fa-envelope" style="color: whitesmoke; font-size: 22px;"></i>
          <p style="color: whitesmoke; font-size: medium;" >${email}</p>
       </div>

       <div class="linkedin">
        <i class="fa-brands fa-linkedin"  style="color: rgb(0, 0, 185); font-size: 22px;"></i>
        <p style="color: lightblue; font-size: medium;">${linkedin}</p>
     </div>

     <div class="interest">Laguage</div>
     <hr class="aboutLine3">
     <div class="language1">
      <p>English</p>
      <p>Marathi</p>
     </div>

     <div class="language1">
      <p>Hindi</p>
     </div>

     <div class="skills">Technical Skills</div>
     <hr  class="aboutLine4">
     <p class="aboutInfo" style="padding-top: 2% padding-left:5%;"><div class="keyword">
              ${keywords
                .split(',')
                .map(
                  keyword =>
                    `<span class="keyword-tag">${keyword.trim()}</span>`
                )
                .join(' ')}
            </div></p>
       </div>
      
    </div>
      <div class="right-section">
            <div style="font-size: 4.2rem; font-weight:700; color:rgb(47, 67, 74)">${fullName}</div>

            <div style="display: flex; gap: 4%; padding-top: 2%;">
              <div style="font-size: small;">MCA Batch(2023-2025)</div>
              <div class="chocobar"></div>
              
            </div>

           <div class="right-bottom">
           
            <div style="padding-top: 2.5%; font-weight: 600; font-size: medium; position: relative;">EDUCATION</div>
            <hr style="width: 15%;">
            <div style="padding-top: 1%; font-size: small; font-weight: 600;">MCA | Thakur Institute of Management Studies Career Development& 
              <br>
              Research (TIMSCDR), Mumbai| Pursuing | 2023</div>
              <div style="padding-top: 1%; font-size: medium; font-weight: 500;"><b>${degree} | ${school} | ${gpa} (CGPA) | ${graduationYear}</b></div>
              <br>  
  
              <div style="font-size: medium; font-weight: 600;">CERTIFICATION PROGRAM</div>
              <hr style="width: 33%; ">
              <div style="padding-top: 3%;">${certifications}</div>
              <div style="width: 80%;   background-color: rgb(47, 67, 74); height: 2px; "></div>
              <div style="padding-top: 2%; font-size: medium; font-weight: bold;">Institute Address</div>
              <div style="padding-top: 1%; font-size: medium;">Thakur Institute of Management Studies Career Development and Research - Thakur Education Campus, Thakur Village, Kandivali East. 
                <br>Mumbai - 400101.
                <br>Phone No: 022- 28840484/91. 
                <br> E-mail ID: timscdr.tnp@thakureducation.org
                </div>

           </div>


      </div>
  </div>

</div>
`;

  // Display the generated resume content in the preview section
  previewContent2.innerHTML = resumeContent2;
}

function generateResume3() {
  // Gather input values from various sections
  const personalInfoSection = inputSections[0];
  const educationSection = inputSections[1];
  const experienceSection = inputSections[2];

  const profileImgElement = document.getElementById('preview-image');
  const profileImgBase64 = profileImgElement.src;
  const fullName = personalInfoSection.querySelector('#full-name').value;
  const dateOfBirth = personalInfoSection.querySelector('#date-of-birth').value;
  const nationality = personalInfoSection.querySelector('#nationality').value;
  const jobTitle = personalInfoSection.querySelector('#job-title').value;
  const address = personalInfoSection.querySelector('#address').value || '';
  const phone = personalInfoSection.querySelector('#phone').value;
  const email = personalInfoSection.querySelector('#email').value;
  const linkedin = personalInfoSection.querySelector('#linkedin').value;
  const summary = personalInfoSection.querySelector('#summary').value;

  const school = educationSection.querySelector('#school').value;
  const degree = educationSection.querySelector('#degree').value;
  const graduationYear = educationSection.querySelector('#graduation-year').value;
  const gpa = educationSection.querySelector('#gpa').value;
  const major = educationSection.querySelector('#major').value;
  const honors = educationSection.querySelector('#honors').value;
  const courses = educationSection.querySelector('#courses').value;

  const jobTitleExp = experienceSection.querySelector('#job-title-experience').value;
  const employer = experienceSection.querySelector('#employer').value;
  const workPeriod = experienceSection.querySelector('#work-period').value;
  const jobDescription = experienceSection.querySelector('#job-description').value;
  const achievements = experienceSection.querySelector('#achievements').value;
  const references = experienceSection.querySelector('#references').value;
  const certifications = experienceSection.querySelector('#certifications').value;
  const keywords = experienceSection.querySelector('#keywords').value;
  
  
  // Create the resume content
  
  const resumeContent3 = `
  <div class="resume3">
  <div id="wrapper" >
    <div class="resume3">
        <div class="img-text" style="display: flex; gap: 5%; padding-bottom: 1rem;">
        <img src="${profileImgBase64}" alt="Profile Image" class="img_display3">
           <div class="name">
            <div style="font-size:4rem; font-weight: bold; color: grey;">${fullName}</div>
            <div style="font-size:2rem;font-weight: 600; color: lightgray;">${jobTitle}</div>
            <div style="font-size: 1.2rem ; font-weight: bold; padding-top: 4%;"> Job Description </div>
            <div style="font-size: 0.8rem; font-weight: bold; padding-top: 2%; padding-bottom: 2%;">${jobDescription}</div>
           </div>
        </div>

        <div class="line" style="height: 3px; width: 80%; background-color: darkgrey;"></div>

         <div class="main" style="display: flex; gap: 2%;">
            
            <div class="left-section"  >
           <div style="background-color: black; color: white; 
           display: flex; justify-content: center; margin-top: 4%; height: 30px ; align-items: center;">Contact</div>
           <div class="Contact-info" style="padding-left: 10px; font-size: medium; ">
            <p>${phone}</p>
            <p>${email}</p>
            <p>${linkedin}</p>
            <p>${address}</p>
           </div>

           <div style="background-color: black; color: white; 
           display: flex; justify-content: center; margin-top: 4%; height: 30px ; align-items: center;">
           Education</div>
           <div class="education"  style="padding-left: 10px; font-size: medium;">
               <div>${degree}</div>
               <div>${school}</div>
           </div>

           <div style="background-color: black; color: white; 
           display: flex; justify-content: center; margin-top: 4%; height: 30px ; align-items: center;" >Keywords</div>
           <div class="keywords">
           ${keywords}
           </div>


        </div>
         <div class="right-section">
          <div style="padding-top: 0.5rem; font-size: 1.5rem; font-weight: bold;">Achivements</div>
          <div class="Achivement">${achievements}</div>

          <div style="padding-top: 0.5rem; font-size: 1.5rem; font-weight: bold;">Certification</div>
          <div class="certification">${certifications}</div>


         </div>
         </div>

    </div>
</div>
  </div>
`;

  // Display the generated resume content in the preview section
  previewContent3.innerHTML = resumeContent3;
}