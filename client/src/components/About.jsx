import React, { useState } from 'react'

const About = () => {
	const [toggleAbout, setToggleAbout] = useState(false)

	const handleToggle = () => {
		setToggleAbout(prev => !prev)
		console.log(toggleAbout)
	}

	return (
		<div className={toggleAbout ? 'about-text-container' : 'about-container'}>
			{toggleAbout ?
			<div className='about-box'>
			<h2>What's the scoop?</h2>
				<p>Trail Chum is the ultimate hangout for backpacking enthusiasts with a 
					passion for quirky journaling antics on the trail. It's your go-to spot 
					for tracking every mile, cataloging your campsites, and scribbling 
					down daily notes. Perfect for adventurers who like to add a dash of data-driven 
					fun to their wilderness escapades!</p>
			<h2>Ready to dive in?</h2>
				<ol>
					<li>
					<p>Become a Trail Chum:</p> 
					Join the party by clicking "Not a member?", filling in your deets, and smashing that "Sign Up" button.
					</li>
					<li>
					<p>Create your Trail:</p> 
					Once you've hopped aboard the Trail Chum train, type in your trail of choice, click the plus sign, and voilà—your trail is born!
					</li>
					<li>
					<p>Add Some Logs (Not the Wooden Kind!):</p>  
					Now that you've got your trail, dive into the nitty-gritty by clicking your trail's name and hitting "Add Log." 
					Already have some logs? Just click the menu toggle in the top left corner and select "Add Log" for more logging capabilities!
					</li>
				</ol>
			<h2>Hiking with Trail Chum</h2>
				<p>Whether you're a laptop warrior, tablet master, or smartphone maestro, Trail Chum is here for you. It's web-based, 
					so as long as you're online, you're good to go! Just a heads up, we're in the beta stages, so no offline shenanigans just yet.</p>
			<h2>Keeping It Top Secret (Your Data, That Is!)</h2>
				<p>We take data security seriously. Trail Chum employs industry-standard encryption protocols to safeguard your information. 
					Rest assured that your journal entries and trail details are protected.</p>
			<h2>Sharing the Love (Or Not)</h2>
				<p>At this time, Trail Chum does not have a sharing feature. Your trails and logs are private and can only be accessed by you.</p>
			
			<button className='about-esc-btn' onClick={handleToggle}>close</button> 
			</div>
			:
			<button  className='post-btn about-btn auth-btn' onClick={handleToggle}>More Info</button>
			}
		</div>
	)
}

export default About