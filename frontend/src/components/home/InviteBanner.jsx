import inviteArt from '../../assets/images/customers-earning-money-by-giving-likes.png'

/**
 * InviteBanner — "Invite your friends, get $20" banner.
 * Props: onInvite (callback)
 */
export default function InviteBanner({ onInvite }) {
  return (
    <section className="invite-card">
      <div className="invite-text">
        <h3>Invite your friends</h3>
        <p>Get $20 for ticket</p>
        <button className="invite-btn" onClick={onInvite}>INVITE</button>
      </div>
      <div className="invite-art">
        <img src={inviteArt} alt="Friends earning rewards" loading="lazy" />
      </div>
    </section>
  )
}
