    document.addEventListener("DOMContentLoaded", function() {
        const mountain = document.getElementById('mountain');
        const cloudBack = document.getElementById('cloud-back');
        const cloudFront = document.getElementById('cloud-front');

        window.addEventListener('scroll', function() {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight) / 2;
            const scale = 1 + scrollPercent; 
            
            mountain.style.transform = `scale(${scale})`;
            cloudBack.style.transform = `scale(${scale})`;
            cloudFront.style.transform = `scale(${scale})`;
        });
    });
