// Useful variables
var admin = false
var count = 0
var currDate, futureDate, diff

// Add white to text
function white(input) {
    return '[[;white;black]' + input + ']'
}
// Add red to text 
function red(input) {
    return '[[;red;black]' + input + ']'
}

// Available Commands
var cmd = {
    about: function() {
        this.echo()
        this.echo('I am a computer science student at Colorado State University, graduating December 2023,')
        this.echo('actively seeking internship opportunities in software engineering or embedded systems.')
        this.echo('With a current interest in OS development, I\'m working on an operating system for')
        this.echo('the x86 architecture with plans to support a file system, command line interface,')
        this.echo('and standalone bootloader.')
        this.echo()
    },
    clear: function() {
        this.clear()
    },
    contact: function() {
        this.echo()
        this.echo("Email:")
        this.echo('\tbryson1@colostate.edu')
        this.echo()
    },
    echo: function(arg) {
        if(arg != undefined)
            this.echo(arg)
    },
    help: function() {
        this.echo()
        this.echo(white('about') + '\t- Cool information')
        this.echo(white('clear') + '\t- Clear the terminal')
        this.echo(white('contact') + '\t- Contact information')
        this.echo(white('echo') + '\t- Print stuff')
        this.echo(white('help') + '\t- Display this menu')
        this.echo(white('links') + '\t- Useful links')
        this.echo(white('restart') + '\t- Reset the terminal')
        if(admin) {
            this.echo(white('secret') + '\t- What is this?')
        } else {
            this.echo(white('su') + '\t\t- Do not use')
        }
        this.echo()
    },
    links: function() {
        this.echo()
        this.echo('Github:')
        this.echo('\thttps://github.com/Bryson-Cook')
        this.echo('Linkedin:')
        this.echo('\tMIA...')   //TODO: Update link
        this.echo()
    },
    restart: function() {
        this.set_prompt('guest@brysoncook.com >> ')
        this.reset()
        admin = false
        count = 0
    },
    su: function() {
        if(!admin) {
            this.echo()
            this.echo('What are you doing?')
            this.echo()
        
            this.set_prompt('admin@brysoncook.com >> ')
            admin = true
        }
    },
    secret: function() {
        if(admin) {
            // First time
            if(count == 0) {
                this.echo()
                this.echo('Welcome super user.')
                this.echo('We regret to inform you that there is no mission available at this time.')
                this.echo('Please be patient as we gather more intel. Thank you.')
                this.echo()

                count = 1
            } 
            // Second time
            else if (count == 1) {
                this.echo()
                this.echo('Welcome super user.')
                this.echo('As mentioned earlier, there is no mission available for you.')
                this.echo('Check back within 5 seconds. Thank you.')
                this.echo()
                
                // Begin countdown
                if (count < 2) count = 2
                if(count == 2) {
                    currDate = new Date()
                    futureDate = new Date()
                    seconds = currDate.getSeconds()
                    futureDate.setSeconds(seconds+5)
                    count = 3
                }
                
            } 
            // Third time (pass or fail)
            else {
                currDate = new Date()
                diff = (futureDate-currDate)/1000
                // Pass
                if(diff > 0) {
                    this.echo()
                    this.echo("Well done super user.")
                    this.echo("You have completed the mission.")
                    this.echo("Redirecting you to your reward.")
                    this.echo("Thank you.")
                    this.echo()
                    
                    getResume()
                    count = 0
                } 
                // Fail 
                else { 
                    this.set_prompt('guest@brysoncook.com >> ')
                    this.reset()
                    this.echo("Mission failed.")

                    admin = false
                    count = 0
                 }
            }
        } else this.echo(red('Command \'secret\' Not Found!'))
    },
}

function getResume() {   
    var url = './docs/resume.pdf'    
    window.open(url,'Resume')  
}

$('body').terminal(cmd, {
    greetings: greeting.innerHTML,
    prompt: 'guest@brysoncook.com >> ',
    completion: true,
    checkArity: false,
    clear: false,
    exit: false,
})