const buttons = document.querySelectorAll('.senarioButton');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    
    if (!button.classList.contains("active"))
        {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add("active")
         }
  });
});